import routes from "../routes";
import User from "../models/User";
import passport from "passport";
export const getJoin = (req, res) => res.render("join");
export const postJoin = async (req, res, next) => {
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
      await User.register(newUser, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.login);
    }
  }
};
export const getLogin = (req, res) => res.render("login");
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const profile = (req, res) => {
  const {
    user: { name, nickname, email }
  } = req;
  res.render("profile", { name, nickname, email });
};
export const getEditProfile = (req, res) => {
  const {
    user: { name, nickname, email }
  } = req;

  res.render("editProfile", { name, nickname, email });
};
export const postEditProfile = async (req, res) => {
  const {
    user: { id }
  } = req;
  const { user } = req;
  const {
    body: { name, nickname, email, oldPassword, newPassword, newPassword2 }
  } = req;
  if (newPassword !== newPassword2) {
    console.log("newPassword not match");
  } else {
    try {
      await User.findByIdAndUpdate({ _id: id }, { name, nickname, email });

      await user.changePassword(oldPassword, newPassword);
      res.redirect(routes.profile(user.id));
    } catch (error) {
      console.log(error);
    }
  }
};
