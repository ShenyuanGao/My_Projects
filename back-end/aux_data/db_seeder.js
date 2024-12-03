import express from 'express';
import pg from 'pg';
import dotenv from "dotenv"
import {users, products} from './data_seeding.js'
import AsynHandler from "express-async-handler"
import bcrypt from 'bcrypt';

const router = express.Router();
dotenv.config()

const SALT_ROUNDS = 5

// Configure PostgreSQL connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect()


//AsynHandler for better debug experience  
router.post('/users', AsynHandler( async (req, res) => {
    try {
        // Delete all existing users
        await db.query('DELETE FROM users');
        // Insert each user
        for (const user of users) {
            //hashing password
            bcrypt.hash(user.password, SALT_ROUNDS, async (err, hash) => {
                if (err) {
                  console.error("Error hashing password:", err);
                  res.status(500).json({ message: 'Server Error hashing password' });
                } else {
                  await db.query(`INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4)`, [user.name, user.email, hash, user.isAdmin]);
                }
            });
        }
        // Send back the inserted users as a response
        res.status(200).json({message: "Seeding success"})
    } catch (error) {
        console.error('Error seeding users:', error);
        res.status(500).json({error: 'Failed to seed users'});
    }
}));


router.get("/products", AsynHandler( async (req, res) => {
    try {
        // Delete all existing users
        await db.query('DELETE FROM products');
        // Insert each user
        for (const product of products) {
            await db.query(`
            INSERT INTO products (name, image, description, rating, num_review, price, count_in_stock) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                product.name,
                product.image,
                product.description,
                product.rating,
                product.numReview,
                product.price,
                product.countInStock
            ]);
        }
        res.status(200).json({message: "Seeding products success"})
    } catch (error) {
        console.error('Error seeding products:', error);
        res.status(500).json({error:'Failed to seed products'});
    }
}));

export default router;
