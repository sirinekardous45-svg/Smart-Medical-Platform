const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

dotenv.config();
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/auth");
const chatRoomRoutes = require("./routes/chatRooms");
const messageRoutes = require("./routes/message");
const { protect } = require("./middleware/authMiddleware");
const Message = require("./Models/Message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chatRooms", chatRoomRoutes);
app.use("/api/messages", messageRoutes);
app.use(errorHandler);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Smart Medical Chat Backend Running"));

// Socket.IO with JWT auth
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error("No token");
    const decoded = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.userId);

  socket.on("joinRoom", (roomId) => socket.join(roomId));
  socket.on("leaveRoom", (roomId) => socket.leave(roomId));

  socket.on("sendMessage", async (data) => {
    try {
      const newMessage = await Message.create({
        sender: socket.userId,
        room: data.roomId,
        content: data.content
      });
      await newMessage.populate("sender", "username role");
      io.to(data.roomId).emit("receiveMessage", newMessage);
    } catch {
      socket.emit("errorMessage", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => console.log("User disconnected: " + socket.userId));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(require("./middleware/errorMiddleware").errorHandler);