import { z } from "zod";

// Esquema de validação usando Zod
export const questionsSchema = z.object({
  body: z.object({
    quantidade: z.number().max(5),
    disciplinas: z
      .array(z.string())
      .nonempty("É necessário informar ao menos uma disciplina."),
    assuntos: z
      .array(z.string())
      .nonempty("É necessário informar ao menos um assunto."),
    dificuldade: z
      .array(z.enum(["fácil", "médio", "difícil"]))
      .nonempty("Escolha pelo menos um nível de dificuldade."),
  }),
});
