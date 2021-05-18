import express from "express";
import { getEdit,postEdit, logout, see, githubSocialLoginReq,githubSocialLoginRes } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/github/authReq", githubSocialLoginReq);
userRouter.get("/github/authRes", githubSocialLoginRes);
userRouter.get("/:id", see);

export default userRouter;