"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.users = [
    {
        id: 1,
        username: "admin",
        passwordHash: bcryptjs_1.default.hashSync("senha123", 10),
    },
];
