import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routers/user.router.js';
import messageRoutes from './routers/message.router.js';
import cors from 'cors';
import {server,app} from './utils/Soket.js';

dotenv.config()

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));



app.use("/api/users", userRoutes) // User routes
app.use("/api/messages",messageRoutes) // Message routes

server.listen(PORT,()=>{
    connectDB()
    console.log("The server is running .....")
})