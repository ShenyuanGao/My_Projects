import express from "express"
import dotenv from "dotenv"
import pg from "pg"
import router from "./aux_data/db_seeder.js" //seeding db router
import userRoute from "./router/user.js"
import { findAllProduct, findAllUser } from "./database/getter.js"
import productRoute from "./router/product.js"
import orderRoute from "./router/order.js"
import cors from "cors"

const app = express()
dotenv.config()
const PORT = process.env.PORT

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

try {
    await db.connect()
    console.log("connected")
} catch (err) {
    console.log(err)
}

app.use(cors())
//setting up seeding router for debugging and modularity
app.use(express.urlencoded({extended: false}))
//sending raw data through postman
app.use(express.json());
app.use("/api/seed", router)
app.use("/api/user", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

//testing get method for users (general testing)
app.get("/api/users", async (req, res) => {
    const response = await findAllUser()
    res.send(response)
})

app.listen(PORT || 4000, () => {
    console.log("Listens at port", PORT)
})