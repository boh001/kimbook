import express from "express";
import routes from "../routes";
import { apiLike, apiReply } from "../controllers/apiCon";

const apiRouter = express.Router();

apiRouter.post(routes.like, apiLike);
apiRouter.post(routes.reply, apiReply);
export default apiRouter;
