import Content from "../models/Content";
import Comment from "../models/Comment";
import User from "../models/User";

export const apiLike = async (req, res) => {
  const {
    body: { id }
  } = req;
  const {
    user: { nickname }
  } = req;

  try {
    const content = await Content.findOne({ _id: id });
    const likeUsers = content.likeUsers;
    if (likeUsers.includes(nickname)) {
      await content.updateOne({
        $inc: { like: -1 },
        $pull: { likeUsers: nickname }
      });
      res.status(200);
      res.send({
        headers: {
          "Content-Type": "text/html"
        },
        body: -1
      });
    } else {
      await content.updateOne({
        $inc: { like: 1 },
        $push: { likeUsers: nickname }
      });
      res.status(200);
      res.send({
        headers: {
          "Content-Type": "text/html"
        },
        body: 1
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const apiView = async (req, res) => {
  const {
    body: { id }
  } = req;

  try {
    await Content.findOneAndUpdate({ _id: id }, { $inc: { view: 1 } });
    res.status(200);
    res.send({
      headers: {
        "Content-Type": "text/html"
      },
      body: 1
    });
  } catch (error) {
    console.log(error);
  }
};
export const apiComment = async (req, res) => {
  const {
    body: { id, text }
  } = req;
  const {
    user: { _id }
  } = req;

  try {
    const newComment = await Comment.create({
      author: _id,
      description: text
    });
    await Content.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment._id } }
    );
    const author = await User.findOne({ _id });
    res.status(200);
    res.send({
      headers: {
        "Content-Type": "text/html"
      },
      body: author.avatarUrl
    });
  } catch (error) {
    console.log(error);
  }
};
