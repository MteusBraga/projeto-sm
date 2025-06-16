"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = require("axios");
dotenv_1.default.config();
const authenticateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    //verifica se tem authorization no header
    if (!authorization) {
        return res
            .status(axios_1.HttpStatusCode.Unauthorized)
            .json({ errors: { default: "Nao autenticado" } });
    }
    //verifica se é do tipo Bearer
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
        return res
            .status(axios_1.HttpStatusCode.Unauthorized)
            .json({ errors: { default: "Nao autenticado" } });
    }
    next();
};
exports.authenticateToken = authenticateToken;
