import express from "express"
import protect from "../middleware/auth.js"
import AsyncHandler from "express-async-handler"
import pg from "pg"

const orderRoute = express.Router()

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect()

orderRoute.post("/", protect, AsyncHandler (async (req, res) => {
    const {
        orderItems,
        shippingAddress, // Should include address, city, postal_code, and country
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        is_paid,
        paid_at
    } = req.body;


    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    try {

        // Step 1: Insert the order into the `orders` table
        const orderResult = await db.query(
            `INSERT INTO orders (user_id, payment_method, shipping_price, tax_price, total_price, is_paid, paid_at, created_at) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) 
             RETURNING id`,
            [
                req.user.id, // Assuming `req.user` contains the authenticated user ID
                paymentMethods,
                shippingPrice,
                taxPrice,
                totalPrice,
                is_paid,
                paid_at
            ]
        );

        const orderId = orderResult.rows[0].id;

        // Step 2: Insert the shipping address into the `shipping_address` table
        await db.query(
            `INSERT INTO shipping_address (order_id, address, city, postal_code, country) 
             VALUES ($1, $2, $3, $4, $5)`,
            [
                orderId,
                shippingAddress.address,
                shippingAddress.city,
                shippingAddress.postal_code,
                shippingAddress.country,
            ]
        );

        // Step 3: Insert the order items into the `order_items` table
        for (const item of orderItems) {
            await db.query(
                `INSERT INTO order_items (order_id, product_id, name, qty, price, image) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    orderId,
                    item.product,
                    item.name,
                    item.qty,
                    item.price,
                    item.image,
                ]
            );
        }

        // Respond with the created order details
        res.status(201).json({
            message: 'Order created successfully',
            orderId,
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Failed to create order' });
    }
}))

orderRoute.put('/:id/payment', protect, AsyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Retrieve the order by ID
        const result = await db.query('SELECT * FROM orders WHERE id = $1', [id]);
        const order = result.rows[0];

        if (order) {
            // Update the order as paid
            await db.query(
                `UPDATE orders 
                SET is_paid = $1, paid_at = NOW()
                WHERE id = $2`,
                [true, id]
            );

            // Insert payment result into the payment_result table
            const paymentResult = await db.query(
                `INSERT INTO payment_result (order_id, payment_id, status, updated_time, email_address)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`,
                [id, req.body.payment_id, req.body.status, req.body.updated_time, req.body.email_address]
            );

            res.json({
                message: 'Payment updated successfully',
                order: {
                    ...order,
                    is_paid: true,
                    paid_at: new Date(),
                },
                payment_result: paymentResult.rows[0],
            });
        } else {
            res.status(404);
            throw new Error('Order Not Found');
        }
    } catch (err) {
        console.error('Error updating payment:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

orderRoute.get('/', protect, AsyncHandler(async (req, res) => {
    try {
        // Fetch orders, shipping_address, and payment_result for the logged-in user
        const result = await db.query(
            `
            SELECT 
                orders.*,
                row_to_json(shipping_address.*) AS shipping_address,
                row_to_json(payment_result.*) AS payment_result
            FROM orders
            LEFT JOIN shipping_address ON shipping_address.order_id = orders.id
            LEFT JOIN payment_result ON payment_result.order_id = orders.id
            WHERE orders.user_id = $1
            ORDER BY orders.id DESC
            `,
            [req.user.id]
        );

        const orders = result.rows;

        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404);
            throw new Error('Orders Not Found');
        }
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}));

orderRoute.get('/:id', protect, AsyncHandler(async (req, res) => {
    try {
        const orderId = req.params.id;

        // Query to fetch the order with related details
        const result = await db.query(
            `
            SELECT 
                orders.*,
                row_to_json(users) AS user,
                row_to_json(shipping_address) AS shipping_address,
                row_to_json(payment_result) AS payment_result,
                (
                    SELECT json_agg(order_items) 
                    FROM order_items 
                    WHERE order_items.order_id = orders.id
                ) AS order_items
            FROM orders
            LEFT JOIN users ON orders.user_id = users.id
            LEFT JOIN shipping_address ON shipping_address.order_id = orders.id
            LEFT JOIN payment_result ON payment_result.order_id = orders.id
            WHERE orders.id = $1
            `,
            [orderId]
        );

        const order = result.rows[0];

        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404);
            throw new Error("Order Not Found");
        }
    } catch (error) {
        console.error("Error fetching order:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));




export default orderRoute;