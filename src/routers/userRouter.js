import express from "express";
import { edit, logout, see, githubSocialLoginReq,githubSocialLoginRes } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/authReq", githubSocialLoginReq);
userRouter.get("/github/authRes", githubSocialLoginRes);
userRouter.get("/:id", see);

export default userRouter;