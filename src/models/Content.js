import mongoose from "mongoose";
import { NULL } from "node-sass";

const ContentSchema = new mongoose.Schema({
  authorName: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  text: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  like: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Content", ContentSchema);
export default model;
