const express = require("express");
const dotenv =require("dotenv");


const app=express();

app.get('/',(req,res)=>{
    res.send("Api is working");
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log("server started"));