import Content from "../models/Content";

export const apiLike = async (req, res) => {
  const {
    body: { id }
  } = req;

  await Content.findOneAndUpdate({ authorId: id }, { $inc: { like: 1 } });

  res.send("upLike");
};
export const apiReply = (req, res) => {
  console.log("reply");
};
