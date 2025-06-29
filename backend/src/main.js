import express from 'express';
import userRouter from './routers/user.router.js';

const app = express()
const PORT = 4000;

app.use("/api/users", userRouter)

app.listen(PORT,()=>{
    console.log("The server is running .....")
})