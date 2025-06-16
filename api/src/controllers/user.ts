import { prisma } from "@/utils/prismaClient";
import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signupSchema } from "@schemas/user";
import * as UserServices from "@services/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "@/@types/user";
import { JWT } from "@services/JWT";

interface IBodyProps extends Omit<User, "id" | "name"> {}

export async function handleSignin(
  req: Request<{}, {}, IBodyProps>,
  res: Response
) {
  const { email, password } = req.body;
  try {
    const user = await UserServices.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(HttpStatusCode.Unauthorized).json({
        errors: { default: "Email ou senha são inválidos" },
      });
      return;
    } else {
      const accessToken = JWT.sign({ userId: user.id });

      if (accessToken === "JWT_SECRET_NOT_FOUND") {
        res.status(HttpStatusCode.InternalServerError).json({
          errors: {
            default: "Erro ao gerar o token de acesso",
          },
        });
        return;
      }
      res.status(HttpStatusCode.Ok).json({
        accessToken: accessToken,
      });
    }
    return;
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      res.status(HttpStatusCode.Unauthorized).json({
        errors: { default: "Email ou senha são inválidos" },
      });
      return;
    }

    // Tratamento para erros do Prisma
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Database error in signin:", error);
      res.status(HttpStatusCode.InternalServerError).json({
        errors: { default: "Erro durante o login" },
      });
      return;
    }

    // Erros inesperados
    console.error("Unexpected error in signin:", error);
    res.status(HttpStatusCode.InternalServerError).json({
      errors: { default: "Erro durante o login" },
    });
    return;
  }
}

export async function handleSignup(req: Request, res: Response) {
  try {
    // Validar os dados de entrada
    const validation = signupSchema.parse({
      body: req.body,
    });

    // Depois extraímos os dados do body validado
    const { email, password, name } = validation.body;

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(HttpStatusCode.Conflict).json({
        errors: { default: "Este email já está sendo usado" },
      });
      return;
    }

    // Hash da senha antes de armazenar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar o usuário no banco de dados

    const user = await UserServices.create(email, hashedPassword, name);

    res.status(HttpStatusCode.Created).json({
      message: "Usuário criado com sucesso",
      user: user.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(HttpStatusCode.BadRequest).json({
        message: "Validação falhou",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    console.error("Signup error:", error);
    res.status(HttpStatusCode.InternalServerError).json({
      message: "An error occurred during user registration",
    });
  }
}
