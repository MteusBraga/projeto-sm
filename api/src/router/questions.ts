import { Router } from "express";
import * as QuestionsController from "@controllers/questions";
import { validateRequest } from "@middlewares/validation";
import { questionsSchema } from "@schemas/questions";
import { authenticateToken } from "@middlewares/auth";

const questionsRouter = Router();

questionsRouter.post(
  "/questions",
  authenticateToken,
  validateRequest(questionsSchema),
  QuestionsController.handleQuestions
);

export default questionsRouter;
