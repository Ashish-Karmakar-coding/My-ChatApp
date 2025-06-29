import express from 'express';
import userRouter from './routers/user.router.js';

const app = express()
const PORT = 4000;

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use("/api/users", userRouter)

app.listen(PORT,()=>{
    console.log("The server is running .....")
})