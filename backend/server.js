const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();
app.use(cors({ origin: true }));

// middleware
app.use(express.json());
// if the path is unknown
app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Connection to server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server started");
});

const io= require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  }
})

io.on("connection",(socket)=>{
  console.log("connected to socket.io")
})