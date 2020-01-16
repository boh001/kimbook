import express from "express";
import routes from "../routes";
import { getJoin, getLogin, postJoin } from "../controllers/userCon";
import { getHome } from "../controllers/homeCon";

const initRouter = express.Router();
initRouter.get(routes.home, getHome);
initRouter.get(routes.join, getJoin);
initRouter.post(routes.join, postJoin);
initRouter.get(routes.login, getLogin);

export default initRouter;
