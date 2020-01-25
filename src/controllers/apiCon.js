import Content from "../models/Content";
import Comment from "../models/Comment";
import User from "../models/User";

export const apiLike = async (req, res) => {
  const {
    body: { id }
  } = req;
  const {
    user: { _id }
  } = req;

  try {
    const content = await Content.findOne({ _id: id });
    const likeUsers = content.likeUsers;
    if (likeUsers.includes(_id)) {
      await content.updateOne({
        $inc: { like: -1 },
        $pull: { likeUsers: _id }
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
        $push: { likeUsers: _id }
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
  const getFormatDate = date => {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "" + month + "" + day;
  };
  const createdAt = getFormatDate(new Date());
  try {
    const newComment = await Comment.create({
      author: _id,
      description: text,
      createdAt
    });
    await Content.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment._id } }
    );
    const author = await User.findOne({ _id });
    const content = await Content.findOne({ _id: id });
    const reply = content.comments.length;

    res.status(200);
    res.send({
      headers: {
        "Content-Type": "application/json"
      },
      body: { avatar: author.avatarUrl, reply }
    });
  } catch (error) {
    console.log(error);
  }
};
export const apiReComment = (req, res) => {
  console.log("hi");
};
export const apiCommentLike = async (req, res) => {
  const {
    body: { id }
  } = req;
  const {
    user: { _id }
  } = req;
  try {
    const comment = await Comment.findOne({ _id: id });
    const likeUsers = comment.likeUsers;
    if (likeUsers.includes(_id)) {
      await comment.updateOne({
        $inc: { like: -1 },
        $pull: { likeUsers: _id }
      });
      res.status(200);
      res.send({
        headers: {
          "Content-Type": "text/html"
        },
        body: -1
      });
    } else {
      await comment.updateOne({
        $inc: { like: 1 },
        $push: { likeUsers: _id }
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
