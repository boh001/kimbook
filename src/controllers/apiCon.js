import Content from "../models/Content";

export const apiLike = async (req, res) => {
  const {
    body: { id }
  } = req;
  console.log(id);

  try {
    await Content.findOneAndUpdate({ _id: id }, { $inc: { like: 1 } });
  } catch (error) {
    console.log(error);
  }
  res.status(200);
  res.send("upLike");
};
export const apiReply = (req, res) => {
  console.log("reply");
};
