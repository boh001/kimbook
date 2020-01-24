import express from "express";
import routes from "../routes";
import { apiLike, apiView, apiComment } from "../controllers/apiCon";

const apiRouter = express.Router();

apiRouter.post(routes.like, apiLike);
apiRouter.post(routes.view, apiView);
apiRouter.post(routes.comment(), apiComment);
export default apiRouter;
