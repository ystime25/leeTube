import express from "express";
import { getEdit,postEdit, logout, see, githubSocialLoginReq,githubSocialLoginRes } from "../controllers/userController";
import { membersAccessMiddleware, visitorsAccessMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", membersAccessMiddleware ,logout);
userRouter.route("/edit").all(membersAccessMiddleware).get(getEdit).post(postEdit);
userRouter.get("/github/authReq",visitorsAccessMiddleware, githubSocialLoginReq);
userRouter.get("/github/authRes",visitorsAccessMiddleware, githubSocialLoginRes);
userRouter.get("/:id", see);

export default userRouter;