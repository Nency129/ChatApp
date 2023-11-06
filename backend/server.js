const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { Server } = require("socket.io");

dotenv.config();
connectDB();
const app = express();
app.use(cors({ origin: true }));

// middleware
app.use(express.json());
// if the path is unknown
app.use((req, res, next) => {
  // console.log(req.path, req.method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Connection to server
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log("server started");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});



io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined room:" + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved?.chat;
    console.log(chat,"chat");

    if (!chat?.users) return console.log("chat.users not defined");

    chat?.users.forEach((user) => {
      if (user._id == newMessageRecieved?.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
  
});
