import { Router } from "express";
import * as UserController from "@controllers/user";
import { validateRequest } from "@middlewares/validation";
import { signinSchema, signupSchema } from "@schemas/user";

const userRouter = Router();

userRouter.post(
  "/signup",
  validateRequest(signupSchema),
  UserController.handleSignup
);

userRouter.post(
  "/signin",
  validateRequest(signinSchema),
  UserController.handleSignin
);

export default userRouter;
