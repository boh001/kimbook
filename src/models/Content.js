import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  authorName: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  contentType: String,
  text: String,
  fileUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  like: {
    type: Number,
    default: 0
  },
  view: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Content", ContentSchema);
export default model;
