import routes from "../routes";
import Content from "../models/Content";
import User from "../models/User";

export const getHome = async (req, res) => {
  const users = await User.find({});
  const contents = await Content.find({}).populate([
    {
      path: "comments",
      model: "Comment",
      populate: {
        path: "author",
        model: "User"
      }
    },
    {
      path: "authorId",
      model: "User"
    }
  ]);

  res.render("home", { contents, users });
};
export const postHome = async (req, res) => {
  const {
    body: { text }
  } = req;

  const {
    file: { path, mimetype }
  } = req;
  const getFormatDate = date => {
    var year = date.getFullYear();
    var month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };
  const createdAt = getFormatDate(new Date());
  console.log(createdAt);

  const {
    user: { id }
  } = req;
  try {
    await Content.create({
      authorId: id,
      fileUrl: path,
      contentType: mimetype,
      text,
      createdAt
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
