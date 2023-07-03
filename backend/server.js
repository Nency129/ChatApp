const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
connectDB();
const app = express();


app.get('/',(req,res)=>{
    res.send("Api is working");
})

const PORT=process.env.PORT || 5000;
// console.log(PORT);
app.listen(PORT,()=>{
    console.log("server started");
});