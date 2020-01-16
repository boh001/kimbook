import express from "express";
import routes from "../routes";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout
} from "../controllers/userCon";
import { getHome } from "../controllers/homeCon";

const initRouter = express.Router();
initRouter.get(routes.home, getHome);
initRouter.get(routes.join, getJoin);
initRouter.post(routes.join, postJoin, postLogin);
initRouter.get(routes.login, getLogin);
initRouter.post(routes.login, postLogin);
initRouter.get(routes.logout, logout);
export default initRouter;
