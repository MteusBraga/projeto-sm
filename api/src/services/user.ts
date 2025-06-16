import { prisma } from "@/utils/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error("Database error in getByEmail:", error.message);
      throw error;
    }
    throw error;
  }
}

export async function create(email: string, password: string, name: string) {
  try {
    // Primeiro verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new PrismaClientKnownRequestError("User already exists", {
        code: "P2002",
        clientVersion: "6.7.0",
        meta: { target: ["email"] },
      });
    }

    // Se não existir, cria o novo usuário
    return await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  } catch (error) {
    // Se for outro erro do Prisma, relança
    if (error instanceof PrismaClientKnownRequestError) {
      throw error;
    }

    // Para outros erros, lança uma exceção genérica
    throw new Error("Failed to create user");
  }
}
