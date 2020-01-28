import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  description: String,
  createdAt: String
});

const model = mongoose.model("Message", messageSchema);
export default model;
