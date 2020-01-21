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
    body: { text }
  } = req;

  const {
    file: { path, mimetype }
  } = req;
  const createAt = Date.now;
  const {
    user: { id, nickname }
  } = req;
  try {
    await Content.create({
      authorName: nickname,
      authorId: id,
      fileUrl: path,
      contentType: mimetype,
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
  const users = await User.find({ nickname: search });
  res.render("search", { users });
};
