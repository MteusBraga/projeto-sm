"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignin = handleSignin;
exports.handleSignup = handleSignup;
const prismaClient_1 = require("@/utils/prismaClient");
const axios_1 = require("axios");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const user_1 = require("@schemas/user");
const UserServices = __importStar(require("@services/user"));
const library_1 = require("generated/prisma/runtime/library");
async function handleSignin(req, res) {
    const { email, password } = req.body;
    const result = await UserServices.getByEmail(email);
    if (result instanceof library_1.PrismaClientKnownRequestError) {
        res
            .status(axios_1.HttpStatusCode.Unauthorized)
            .json({ errors: { default: "Email ou senha são inválidos" } });
    }
    const hashedPassword = result?.password;
    const isPasswordValid = await bcryptjs_1.default.compare(password, hashedPassword);
    if (!isPasswordValid) {
        res.status(axios_1.HttpStatusCode.Unauthorized).json({
            errors: { default: "Email ou senha são inválidos" },
        });
    }
    else {
        res.status(axios_1.HttpStatusCode.Ok).json({ accessToken: "teste.teste.teste" });
    }
}
async function handleSignup(req, res) {
    try {
        // Validar os dados de entrada
        const validation = user_1.signupSchema.parse({
            body: req.body,
        });
        // Depois extraímos os dados do body validado
        const { email, password, name } = validation.body;
        // Verificar se o usuário já existe
        const existingUser = await prismaClient_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(axios_1.HttpStatusCode.Conflict).json({
                message: "Já existe um usuário com este email",
            });
        }
        // Hash da senha antes de armazenar
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        // Criar o usuário no banco de dados
        const user = await UserServices.create(email, hashedPassword, name);
        res.status(axios_1.HttpStatusCode.Created).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(axios_1.HttpStatusCode.BadRequest).json({
                message: "Validation failed",
                errors: error.errors.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                })),
            });
        }
        console.error("Signup error:", error);
        res.status(axios_1.HttpStatusCode.InternalServerError).json({
            message: "An error occurred during user registration",
        });
    }
}
