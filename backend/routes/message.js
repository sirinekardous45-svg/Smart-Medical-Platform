// routes/messages.js
const express = require("express");
const router = express.Router();
const Message = require("../Models/Message");

// Envoyer un message
router.post("/send", async (req, res) => {
  const { roomId, sender, text } = req.body;
  try {
    const message = new Message({ roomId, sender, text });
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupérer messages d'une salle
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;