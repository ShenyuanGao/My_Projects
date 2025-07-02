import express from "express"
import AsyncHandler from "express-async-handler"
import { findAllProduct, findProduct } from "../database/getter.js"


const productRoute = express.Router()

productRoute.get("/", AsyncHandler(async(req, res) => {
    try{
        const products = await findAllProduct()
        res.status(200).json(products)
    } catch (err) {
        res.status(400).json({message: "server error getting products"})
    }
}))

productRoute.get("/:id", AsyncHandler(async(req, res) => {
    try{
        const products = await findProduct(req.params.id)
        products ? res.status(200).json(products) : res.status(404).json({message: "product not found"})
    } catch (err) {
        res.status(400).json({message: "server error getting products"})
    }
}))



export default productRoute