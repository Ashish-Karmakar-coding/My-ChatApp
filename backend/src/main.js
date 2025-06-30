import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/user.router.js';
import connectDB from './db/connectDB.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use(express.json()) // Middleware to parse JSON bodies
app.use("/api/users", userRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log("The server is running .....")
})