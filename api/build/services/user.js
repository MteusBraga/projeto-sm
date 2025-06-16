"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByEmail = getByEmail;
exports.create = create;
const prismaClient_1 = require("@/utils/prismaClient");
async function getByEmail(email) {
    return await prismaClient_1.prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            name: true,
            password: true,
        },
    });
}
async function create(email, password, name) {
    return await prismaClient_1.prisma.user.create({
        data: {
            email,
            password,
            name,
        },
        select: {
            // Não retornar a senha na resposta
            id: true,
            email: true,
            name: true,
        },
    });
}
