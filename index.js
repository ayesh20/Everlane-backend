import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import productRouter from"./routers/productRouter.js"
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./routers/contactRouter.js";
import userRouter from "./routers/userRouter.js";
import cRouter from "./routers/cartRouter.js";



dotenv.config()


const app = express()

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json())

const publicRoutes = [
    '/api/users/register',
    '/api/users/login'
];

app.use((req, res, next) => {
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    const value = req.header("Authorization");

    if (value != null) {
        const token = value.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err || decoded == null) {
                return res.status(403).json({
                    message: "Invalid or expired token"
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        next(); 
    }
});


const connectionString = process.env.MONGO_URI


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Connected to database")
    }
).catch(
    ()=>{
        console.log("Failed to connect to the database")
    }
)







app.use("/api/users", userRouter)
app.use("/api/cart", cRouter)
app.use("/api/products",productRouter)
app.use("/api/contactus", contactRouter)




app.listen(5000, 
   ()=>{
       console.log("server started")
   }
)
