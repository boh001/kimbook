import routes from "../routes";
import Content from "../models/Content";
import User from "../models/User";

export const getHome = async (req, res) => {
  const contents = await Content.find({}).populate([
    {
      path: "comments",
      model: "Comment",
      populate: [
        {
          path: "author",
          model: "User"
        },
        {
          path: "comments",
          model: "Comment",
          populate: {
            path: "author",
            model: "User"
          }
        }
      ]
    },
    {
      path: "authorId",
      model: "User"
    }
  ]);
  res.render("home", { contents });
};
export const postHome = async (req, res) => {
  const {
    body: { text }
  } = req;
  console.log(req.file);

  const {
    file: { location, mimetype }
  } = req;

  const {
    user: { id }
  } = req;
  try {
    await Content.create({
      authorId: id,
      fileUrl: location,
      contentType: mimetype,
      text
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
  const people = await User.find({ nickname: search });
  res.render("search", { people });
};
