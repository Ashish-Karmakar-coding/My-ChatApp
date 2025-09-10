import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routers/user.router.js';
import messageRoutes from './routers/message.router.js';
import cors from 'cors';
import {server,app} from './utils/Soket.js';

import path from 'path';

dotenv.config()

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.get('/',(req,res)=>{
    res.send("Welcome to the Chat App Backend")
})

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true, 
}));

app.use(express.json()) 
app.use(cookieParser()) 

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/users", userRoutes)
app.use("/api/messages",messageRoutes) 

// Increase payload size limit - ADD THIS TO YOUR SERVER FILE

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    // ✅ Fixed: Added parameter name to wildcard route
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}

server.listen(PORT, () => {
    connectDB()
    console.log(`The server is running on port ${PORT}`)
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use. Please use a different port.`);
        process.exit(1);
    } else {
        console.log('Server error:', err);
    }
});