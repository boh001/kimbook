import express from "express";
import routes from "../routes";
import {
  profile,
  getEditProfile,
  postEditProfile
} from "../controllers/userCon";

const userRouter = express.Router();
userRouter.get(routes.profile(), profile);
userRouter.get(routes.editProfile(), getEditProfile);
userRouter.post(routes.editProfile(), postEditProfile);
export default userRouter;
