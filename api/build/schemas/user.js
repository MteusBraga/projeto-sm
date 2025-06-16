"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
// Esquema de validação usando Zod
exports.signupSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Formato de email inválido"),
        password: zod_1.z
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maíuscula")
            .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
            .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
        name: zod_1.z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
    }),
});
exports.signinSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Formato de email inválido"),
        password: zod_1.z.string().min(8, "Senha errada"),
    }),
});
