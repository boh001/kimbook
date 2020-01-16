export const getHome = (req, res) => {
  console.log(req.user);
  res.render("home");
};
