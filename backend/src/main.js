import express from 'express';

const app = express()
const PORT = 4000;

app.get('/',(req,res)=>{
    res.send("Hello wold")
})

app.listen(PORT,()=>{
    console.log("The server is running .....")
})