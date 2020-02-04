import routes from "../routes";
import User from "../models/User";
import passport from "passport";
import crypto from "crypto";
import { transporter, mailOptions } from "../nodemailer";

export const getJoin = (req, res) => res.render("join");
export const postJoin = async (req, res, next) => {
  const {
    body: { name, nickname, email, password, password2 }
  } = req;
  const {
    file: { location }
  } = req;

  const keyOne = crypto
    .randomBytes(256)
    .toString("hex")
    .substr(100, 5);
  const keyTwo = crypto
    .randomBytes(256)
    .toString("base64")
    .substr(50, 5);
  const verifyKey = `${keyOne + keyTwo}`;
  req.body.verifyKey = verifyKey;
  if (password !== password2) {
    res.staus(404);
    console.log("password not equal password2");
  } else {
    try {
      const newUser = await User({
        avatarUrl: location,
        name,
        nickname,
        email,
        emailVerified: false,
        verifyKey
      });
      await User.register(newUser, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.login);
    }
  }
};
export const verifyEmail = (req, res) => {
  const {
    body: { nickname, email, verifyKey }
  } = req;
  const host = req.get("host");
  transporter.sendMail(
    mailOptions(host, nickname, email, verifyKey),
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sending");
      }
      res.redirect(routes.login);
    }
  );
};
export const getAuth = async (req, res) => {
  const {
    query: { key }
  } = req;
  const user = await User.find({ verifyKey: encodeURIComponent(key) });
  if (user.length !== 0) {
    await User.findOneAndUpdate({ verifyKey: key }, { emailVerified: true });
    res.render("auth", { verify: '"Success"' });
  } else {
    res.render("auth", { verify: '"Fail"' });
  }
};

export const getLogin = (req, res) => res.render("login");

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login
});

export const checkAuth = async (req, res, next) => {
  const {
    body: { nickname }
  } = req;
  const user = await User.find({ nickname, emailVerified: true });
  if (user.length === 1) {
    next();
  } else {
    res.redirect(routes.login);
  }
};
export const logout = async (req, res) => {
  const {
    user: { id }
  } = req;
  await User.findOneAndUpdate({ _id: id }, { login: false });
  req.logout();
  res.redirect(routes.home);
};
export const profile = (req, res) => {
  res.render("profile");
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
