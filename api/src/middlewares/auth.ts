import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { HttpStatusCode } from "axios";
import { JWT } from "@services/JWT";

dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { authorization } = req.headers;

  //verifica se tem authorization no header
  if (!authorization) {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ errors: { default: "Nao autenticado" } });
  }

  //verifica se é do tipo Bearer
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res
      .status(HttpStatusCode.Unauthorized)
      .json({ errors: { default: "Nao autenticado" } });
  }

  const jwtData = JWT.verify(token);

  if (jwtData === "JWT_SECRET_NOT_FOUND") {
    res
      .status(HttpStatusCode.InternalServerError)
      .json({ errors: { default: "Erro ao verificar o token" } });
    return;
  } else if (jwtData === "INVALID_TOKEN") {
    res
      .status(HttpStatusCode.Unauthorized)
      .json({ errors: { default: "Não autenticado" } });
    return;
  }

  req.headers.idUser = jwtData.userId.toString();
  next();
};
