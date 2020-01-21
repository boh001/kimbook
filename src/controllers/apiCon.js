import Content from "../models/Content";

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
