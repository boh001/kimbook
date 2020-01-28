import express from "express";
import routes from "../routes";
import {
  apiLike,
  apiView,
  apiComment,
  apiReComment,
  apiCommentLike,
  apiPlusFriend
} from "../controllers/apiCon";

const apiRouter = express.Router();

apiRouter.post(routes.like, apiLike);
apiRouter.post(routes.view, apiView);
apiRouter.post(routes.comment, apiComment);
apiRouter.post(routes.reComment, apiReComment);
apiRouter.post(routes.commentLike, apiCommentLike);
apiRouter.post(routes.plusFriend, apiPlusFriend);
export default apiRouter;
