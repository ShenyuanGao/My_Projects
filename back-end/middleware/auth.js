import jwt from "jsonwebtoken"
import asynchandler from "express-async-handler"
import dotenv from "dotenv"
import { findUser } from "../database/getter.js";

dotenv.config()

const protect = asynchandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from the Authorization header
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the user by decoded token ID and exclude password(decoded token give id, iat, exp)
            const user = await findUser(decodedToken.id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            // Attach the user to the request, excluding sensitive fields like password BIND REQ.user
            req.user = {
                ...user,
                password: undefined, // Exclude password explicitly
            };
            next();
        } catch (err) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

export default protect;
