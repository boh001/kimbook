import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  text: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Content", ContentSchema);
export default model;
