import routes from "../routes";
import Content from "../models/Content";
import User from "../models/User";

export const getHome = async (req, res) => {
  const users = await User.find({});
  const contents = await Content.find({});
  res.render("home", { contents, users });
};
export const postHome = async (req, res) => {
  const {
    body: { title, text }
  } = req;
  const {
    file: { path }
  } = req;
  const createAt = Date.now;
  const {
    user: { nickname }
  } = req;
  try {
    await Content.create({
      author: nickname,
      fileUrl: path,
      title,
      text,
      createAt
    });
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
  }
};
export const getSearch = async (req, res) => {
  const {
    query: { search }
  } = req;

  console.log(search);

  const users = await User.find({ nickname: search });
  console.log(users);

  res.render("search", { users });
};
