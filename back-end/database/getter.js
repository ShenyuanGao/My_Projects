import pg from "pg"

//some common queries
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect()

async function findUser(id) {
    try {
        const response = await db.query("SELECT * FROM users WHERE id = $1", [id])
        return response.rows[0]
    } catch (err) {
        console.log(err)
    }
}

async function findAllUser() {
    try {
        const response = await db.query("SELECT * FROM users")
        return response.rows
    } catch (err) {
        console.log(err)
    }
}

async function findProduct(id) {
    try {
        const response = await db.query("SELECT * FROM products WHERE id = $1", [id])
        return response.rows[0]
    } catch (err) {
        console.err(err)
    }
}

async function findAllProduct() {
    try {
        const response = await db.query("SELECT * FROM products")
        return response.rows
    } catch (err) {
        console.log(err)
    }
}

export {findAllProduct, findAllUser, findUser, findProduct};