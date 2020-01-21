import express from "express";
import routes from "../routes";
import { apiLike, apiView } from "../controllers/apiCon";

const apiRouter = express.Router();

apiRouter.post(routes.like, apiLike);
apiRouter.post(routes.view, apiView);
export default apiRouter;
