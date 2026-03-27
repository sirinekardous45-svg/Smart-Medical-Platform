const ChatRoom = require("../models/ChatRoom");

exports.createRoom = async (req, res) => {
  const { name, members } = req.body;
  const room = await ChatRoom.create({ name, members });
  res.status(201).json(room);
};

exports.getRooms = async (req, res) => {
  const rooms = await ChatRoom.find({ members: req.user._id }).populate("members", "username role");
  res.json(rooms);
};