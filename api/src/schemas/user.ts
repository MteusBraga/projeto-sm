import { z } from "zod";

// Esquema de validação usando Zod
export const signupSchema = z.object({
  body: z.object({
    email: z.string().email("Formato de email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maíuscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
    name: z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
  }),
});

export const signinSchema = z.object({
  body: z.object({
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(8, "Senha errada"),
  }),
});
