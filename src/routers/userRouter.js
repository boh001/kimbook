import express from "express";
import routes from "../routes";

const userRouter = express.Router();
userRouter.get(routes.profile(), (req, res) => {
  res.send("hi");
});

export default userRouter;
