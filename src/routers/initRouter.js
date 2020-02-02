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
import { getHome, postHome, getSearch } from "../controllers/homeCon";
import { contentUpload } from "../middleware";

const initRouter = express.Router();
initRouter.get(routes.home, getHome);
initRouter.post(routes.home, contentUpload, postHome);
initRouter.get(routes.search, getSearch);
initRouter.get(routes.join, getJoin);
initRouter.post(routes.join, contentUpload, postJoin, verifyEmail);
initRouter.get(routes.login, getLogin);
initRouter.post(routes.login, checkAuth, postLogin);
initRouter.get(routes.logout, logout);
initRouter.get(routes.auth, getAuth);

export default initRouter;
