import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  like: {
    type: Number,
    default: 0
  },
  likeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  view: {
    type: Number,
    default: 0
  }
});

const model = mongoose.model("Content", ContentSchema);
export default model;
