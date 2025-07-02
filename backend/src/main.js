import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user.router.js';
import messageRouter from './routers/message.router.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/users", userRouter) // User routes
app.use("/api/messages",messageRouter) // Message routes

app.listen(PORT,()=>{
    connectDB()
    console.log("The server is running .....")
})