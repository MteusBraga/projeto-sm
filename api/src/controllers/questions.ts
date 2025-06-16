import { Questions } from "@/@types/questions";
import { generateQuestion } from "@lib/langchain/chains/generateQuestion";
import { reviewQuestions } from "@lib/langchain/chains/reviewQuestions";
import { Request, Response } from "express";

export async function handleQuestions(
  req: Request<{}, {}, Questions>,
  res: Response
) {
  const { disciplinas, dificuldades, assuntos, quantidade } = req.body;
  try {
    const questoes = await generateQuestion({
      disciplinas,
      dificuldades,
      assuntos,
      quantidade,
    });

    const revisadas = await reviewQuestions(questoes);
    console.log("Questoes geradas: ", questoes);
    console.log("Revisadas: ", revisadas);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send(prompt);
}
