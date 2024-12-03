import express from "express"
import pg from "pg"
import AsynHandler from "express-async-handler"
import bcrypt from "bcrypt"
import generateToken from "../token_generate.js"
import protect from "../middleware/auth.js"
import { findUser } from "../database/getter.js"


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

await db.connect()

const SALT_ROUNDS = 5

const userRoute = express.Router()


//login Route
userRoute.post("/login", AsynHandler (async(req, res) => {
    //"alice.johnson@example.com"
    //password123
    const { email, password } = req.body
    try {
        const result = await db.query(
          "SELECT * FROM users WHERE email = $1 ",
          [email]
        );
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
                res.status(400).json({ message: 'Server Error camparing password' });
            } else {
              if (valid) {
                res.status(200).json({
                    ...user,
                    token: generateToken(user.id)
                })
                return user
              } else {
                res.status(401).json({ message: 'Wrong password' });
              }
            }
          });
        } else {
          res.status(401).json({ message: 'User Not found' });
        }
      } catch (err) {
        console.log(err);
    }
}    
))

//register route
userRoute.post("/register", AsynHandler (async(req, res) => {
    //"alice.johnson@example.com"
    //password123
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const is_admin = false

    try {
      const checkResult = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
  
      if (checkResult.rows.length > 0) {
        res.status(401).json({ message: 'User already exists' });
      } else {
        bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
            res.status(500).json({ message: 'Server Error hashing password' });

          } else {
            const result = await db.query(
              "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
              [name, email, hash, is_admin]
            );
            res.status(200).json(result.rows[0])
          }
        });
      }
    } catch (err) {
      res.status(500).json({message: 'Database Error'})
    }
}    
))

//get user profile, only authorized
userRoute.get("/profile", protect, AsynHandler (async (req, res) => {
    const user = await findUser(req.user.id)
    user ? res.status(200).json(user) : res.status(404).json({message: "user not found"})
}))

//user profile update
userRoute.put("/profile", protect, AsynHandler(async (req, res) => {
        const userId = req.user.id;
        // Fetch the existing user details from the database
        const user = await findUser(req.user.id)

        if (user) {
            // Prepare updated fields
            const name = req.body.name || user.name;
            const email = req.body.email || user.email;
            let password = user.password; // Keep existing hashed password

            // If a new password is provided, hash it
            if (req.body.password) {
                password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
            }

            // Update user details in the database
            const updatedUserResult = await db.query(
                `UPDATE users 
                 SET name = $1, email = $2, password = $3 
                 WHERE id = $4 
                 RETURNING id, name, email, is_admin`,
                [name, email, password, userId]
            );

            const updatedUser = updatedUserResult.rows[0];

            // Send back the updated user details (excluding sensitive information like password)
            res.json({
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.is_admin,
                token: generateToken(updatedUser.id)
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    
}))

export default userRoute