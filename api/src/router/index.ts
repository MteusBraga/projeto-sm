import { authenticateToken } from "@middlewares/auth";
import { Request, Response, Router } from "express";
import userRouter from "./user";
import questionsRouter from "./questions";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Healthy App :)");
});

router.use(userRouter).use(questionsRouter);
export default router;
