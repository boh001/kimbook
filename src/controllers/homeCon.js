export const getHome = (req, res) => {
  console.log(req.user);
  res.render("home");
};
export const postHome = (req, res) => {
  const {
    body: { title, text }
  } = req;
  const {
    file: { path }
  } = req;
};
