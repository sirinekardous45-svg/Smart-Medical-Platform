const express = require("express");
const router = express.Router();
const ChatRoom = require("../models/ChatRoom");


router.post("/create", async (req, res) => {
    const { name } = req.body;
    try {
        const room = new ChatRoom({ name, users: [] });
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/", async (req, res) => {
    try {
        const rooms = await ChatRoom.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;