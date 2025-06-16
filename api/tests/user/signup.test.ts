import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { testServer } from "../jest.setup";
import { HttpStatusCode } from "axios";

import { prisma } from "../../src/utils/prismaClient";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

describe("Testes User - Signup", () => {
  it("Deve cadastrar usuário com sucesso", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste1@example.com`,
      name: "Test User",
    });
    expect(res1.statusCode).toEqual(HttpStatusCode.Created);
    expect(res1.body).toHaveProperty("user");
    expect(res1.body).toHaveProperty("message");
    expect(typeof res1.body.user).toEqual("string");
    expect(typeof res1.body.message).toEqual("string");
  });

  it("Erro ao cadastrar usuário com email duplicado", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste@example.com`,
      name: "Test User",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.Created);
    expect(typeof res1.body.user).toEqual("string");

    const res2 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste@example.com`,
      name: "Test User",
    });

    expect(res2.statusCode).toEqual(HttpStatusCode.Conflict);
    expect(res2.body).toHaveProperty("errors.default");
  });

  it("Erro ao cadastrar um usuário sem email", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      // email: `teste3@example.com`,
      name: "Test User",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].path).toEqual("body.email");
  });
  it("Erro ao cadastrar um usuário sem senha", async () => {
    const res1 = await testServer.post("/signup").send({
      //   password: "X8Ojx10WpS8G2ZI",
      email: `teste4@example.com`,
      name: "Test User",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].path).toEqual("body.password");
  });
  it("Erro ao cadastrar um usuário sem nome", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste5@example.com`,
      //   name: "Test User",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].path).toEqual("body.name");
  });
  it("Erro ao cadastrar com email inválido", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste5 example.com`,
      name: "Test User",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual("Formato de email inválido");
  });
  it("Erro ao cadastrar com nome muito curto", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8Ojx10WpS8G2ZI",
      email: `teste5@example.com`,
      name: "T",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual(
      "O nome deve conter pelo menos 2 caracteres"
    );
  });
  it("Erro ao cadastrar com senha muito curta", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "X8pSI",
      email: `teste5@example.com`,
      name: "Test",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual(
      "A senha deve ter pelo menos 8 caracteres"
    );
  });
  it("Erro ao cadastrar com senha sem letra maiúscula", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "8jxaaaaaaaa",
      email: `teste5@example.com`,
      name: "Test",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual(
      "A senha deve conter pelo menos uma letra maíuscula"
    );
  });
  it("Erro ao cadastrar com senha sem letra minúscula", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "AAAAAAAAAA3",
      email: `teste5@example.com`,
      name: "Test",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual(
      "A senha deve conter pelo menos uma letra minúscula"
    );
  });
  it("Erro ao cadastrar com senha sem número", async () => {
    const res1 = await testServer.post("/signup").send({
      password: "AAAAAAAAAAaaa",
      email: `teste5@example.com`,
      name: "Test",
    });

    expect(res1.statusCode).toEqual(HttpStatusCode.BadRequest);
    expect(res1.body).toHaveProperty("errors");
    expect(res1.body.errors[0].message).toEqual(
      "A senha deve conter pelo menos um número"
    );
  });
});
