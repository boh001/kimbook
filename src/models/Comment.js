import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  like: {
    type: Number,
    default: 0
  },
  likeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
