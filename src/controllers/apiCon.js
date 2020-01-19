export const apiLike = (req, res) => {
  const {
    body: { id }
  } = req;
  res.send("upLike");
};
export const apiReply = (req, res) => {
  console.log("reply");
};
