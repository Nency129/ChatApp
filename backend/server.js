const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

// middleware
app.use(express.json());
// if the path is unknown 
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);

// Connection to server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server started");
});
