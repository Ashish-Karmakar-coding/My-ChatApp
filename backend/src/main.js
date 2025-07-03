import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routers/user.router.js';
import messageRoutes from './routers/message.router.js';
import cors from 'cors';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/users", userRoutes) // User routes
app.use("/api/messages",messageRoutes) // Message routes
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.listen(PORT,()=>{
    connectDB()
    console.log("The server is running .....")
})