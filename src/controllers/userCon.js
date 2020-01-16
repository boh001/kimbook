import routes from "../routes";
import User from "../models/User";
export const getJoin = (req, res) => res.render("join");
export const postJoin = async (req, res) => {
  const {
    body: { name, nickname, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.staus(404);
    console.log("password not equal password2");
  } else {
    try {
      const newUser = await User({
        name,
        nickname,
        email
      });
      User.register(newUser, password);
      res.redirect(routes.home);
    } catch (error) {
      console.log(error);
      res.redirect(routes.login);
    }
  }
};
export const getLogin = (req, res) => res.render("login");
