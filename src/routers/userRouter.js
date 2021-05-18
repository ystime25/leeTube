import express from "express";
import { getEdit,postEdit, logout, see, githubSocialLoginReq,githubSocialLoginRes, getChangePassword, postChangePassword } from "../controllers/userController";
import { membersAccessMiddleware, visitorsAccessMiddleware } from "../middlewares";
import User from "../models/User";

const userRouter = express.Router();

userRouter.get("/logout", membersAccessMiddleware ,logout);
userRouter.route("/edit").all(membersAccessMiddleware).get(getEdit).post(postEdit);
userRouter.route("/change-password").all(membersAccessMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/github/authReq",visitorsAccessMiddleware, githubSocialLoginReq);
userRouter.get("/github/authRes",visitorsAccessMiddleware, githubSocialLoginRes);

userRouter.get("/:id", see);

export default userRouter;