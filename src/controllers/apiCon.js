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
      await content.update({
        $inc: { like: -1 },
        $pull: { likeUsers: nickname }
      });
      res.status(200);
      res.send("downLike");
    } else {
      await content.update({
        $inc: { like: 1 },
        $push: { likeUsers: nickname }
      });
      res.status(200);
      res.send("upLike");
    }
  } catch (error) {
    console.log(error);
  }
};
export const apiView = (req, res) => {
  console.log("reply");
};
