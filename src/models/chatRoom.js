import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  _id: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

const model = mongoose.model("ChatRoom", chatRoomSchema);
export default model;
