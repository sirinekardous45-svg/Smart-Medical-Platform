const Message = require("../Models/Message");

exports.getMessages = async (req, res) => {
  const { roomId } = req.params;
  const messages = await Message.find({ room: roomId }).populate("sender", "username role").sort("createdAt");
  res.json(messages);
};