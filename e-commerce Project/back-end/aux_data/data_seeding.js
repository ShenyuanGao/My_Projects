// Users.js
const users = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "password123",  // In a real application, passwords should be hashed.
        isAdmin: true
    },
    {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        password: "password123",
        isAdmin: false
    },
    {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        password: "password123",
        isAdmin: false
    },
    {
        name: "Diana Prince",
        email: "diana.prince@example.com",
        password: "password123",
        isAdmin: true
    },
    {
        name: "Eve Davis",
        email: "eve.davis@example.com",
        password: "password123",
        isAdmin: false
    }
];

// Products.js
const products = [
    {
        name: "Wireless Bluetooth Headphones",
        image: "https://example.com/images/headphones.jpg",
        description: "High-quality wireless Bluetooth headphones with noise-cancellation and 20 hours of battery life.",
        rating: 4.5,
        numReview: 150,
        price: 59.99,
        countInStock: 25
    },
    {
        name: "Smartphone Stand Holder",
        image: "https://example.com/images/stand.jpg",
        description: "Adjustable smartphone stand holder with a sleek design, perfect for watching videos or video calling.",
        rating: 4.0,
        numReview: 80,
        price: 12.99,
        countInStock: 100
    },
    {
        name: "Portable Power Bank 20000mAh",
        image: "https://example.com/images/powerbank.jpg",
        description: "Ultra-compact 20000mAh power bank with fast charging capabilities and dual USB ports.",
        rating: 4.8,
        numReview: 230,
        price: 29.99,
        countInStock: 50
    },
    {
        name: "4K Ultra HD Smart TV",
        image: "https://example.com/images/smarttv.jpg",
        description: "65-inch 4K Ultra HD Smart TV with HDR support and built-in streaming apps.",
        rating: 4.7,
        numReview: 300,
        price: 499.99,
        countInStock: 15
    },
    {
        name: "Ergonomic Office Chair",
        image: "https://example.com/images/chair.jpg",
        description: "Comfortable ergonomic office chair with adjustable height and lumbar support.",
        rating: 4.3,
        numReview: 120,
        price: 109.99,
        countInStock: 20
    },
    {
        name: "Gaming Keyboard and Mouse Combo",
        image: "https://example.com/images/keyboardmouse.jpg",
        description: "RGB backlit mechanical gaming keyboard with programmable mouse for a complete gaming setup.",
        rating: 4.6,
        numReview: 95,
        price: 45.99,
        countInStock: 35
    },
    {
        name: "Stainless Steel Water Bottle",
        image: "https://example.com/images/waterbottle.jpg",
        description: "Durable stainless steel water bottle with vacuum insulation to keep drinks cold for 24 hours.",
        rating: 4.9,
        numReview: 160,
        price: 19.99,
        countInStock: 75
    },
    {
        name: "Wireless Charging Pad",
        image: "https://example.com/images/chargingpad.jpg",
        description: "Slim and fast wireless charging pad compatible with all Qi-enabled devices.",
        rating: 4.2,
        numReview: 110,
        price: 22.99,
        countInStock: 60
    },
    {
        name: "LED Desk Lamp with USB Charging Port",
        image: "https://example.com/images/desklamp.jpg",
        description: "Adjustable LED desk lamp with a built-in USB charging port and multiple brightness levels.",
        rating: 4.4,
        numReview: 65,
        price: 34.99,
        countInStock: 40
    },
    {
        name: "Smartwatch with Fitness Tracker",
        image: "https://example.com/images/smartwatch.jpg",
        description: "Feature-packed smartwatch with heart rate monitor, GPS, and fitness tracking capabilities.",
        rating: 4.1,
        numReview: 210,
        price: 89.99,
        countInStock: 30
    }
];



export {products, users}
