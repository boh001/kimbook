import express from "express";
import routes from "../routes";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  getAuth,
  verifyEmail,
  checkAuth
} from "../controllers/userCon";
import { getHome } from "../controllers/homeCon";
import { imgUpload } from "../middleware";

const initRouter = express.Router();
initRouter.get(routes.home, getHome);
initRouter.post(routes.home);
initRouter.get(routes.join, getJoin);
initRouter.post(routes.join, imgUpload, postJoin, verifyEmail);
initRouter.get(routes.login, getLogin);
initRouter.post(routes.login, postLogin, checkAuth);
initRouter.get(routes.logout, logout);
initRouter.get(routes.auth, getAuth);
export default initRouter;
