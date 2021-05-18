import express from "express";
import { getSignUp,postSignUp, getLogin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { visitorsAccessMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/signup").all(visitorsAccessMiddleware).get(getSignUp).post(postSignUp);
rootRouter.route("/login").all(visitorsAccessMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/results", search);


export default rootRouter;