import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { testServer } from "../jest.setup";
import { HttpStatusCode } from "axios";

import { prisma } from "../../src/utils/prismaClient";

describe("Testes User - Signin", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste122@example.com`,
      name: "Test User",
    });
  });

  it("Faz login com sucesso", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste122@example.com`,
    });
    expect(res1.statusCode).toEqual(HttpStatusCode.Ok);
    expect(res1.body).toHaveProperty("accessToken");
  });
  it("Senha errada", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "X",
      email: `teste122@example.com`,
    });
    expect(res1.statusCode).toEqual(HttpStatusCode.Unauthorized);
    expect(res1.body).toHaveProperty("errors.default");
    expect(res1.body.errors.default).toEqual("Email ou senha são inválidos");
  });
  it("Email errado", async () => {
    const res1 = await testServer.post("/signin").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste12@example.com`,
    });
    expect(res1.statusCode).toEqual(HttpStatusCode.Unauthorized);
    expect(res1.body).toHaveProperty("errors.default");
    expect(res1.body.errors.default).toEqual("Email ou senha são inválidos");
  });
  //   it("Não informado a senha", async () => {});
  //   it("Não informado o email", async () => {});
});
