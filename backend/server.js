// server.js
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const chatRoomRoutes = require("./routes/chatRooms");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chatRooms", chatRoomRoutes);
// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("Smart Medical Chat Backend Running");
});
 
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));