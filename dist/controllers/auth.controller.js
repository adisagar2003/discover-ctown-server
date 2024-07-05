"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const token_utils_1 = __importDefault(require("../utils/token.utils"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
/*
Login
*/
router.post('/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // login 
    try {
        const { username, password } = req.body;
        const targetUser = yield prisma.user.findFirstOrThrow({ where: { username: username } });
        if (targetUser.password) {
            const isPasswordCorrect = yield bcryptjs_1.default.compare(password, targetUser.password);
            if (!isPasswordCorrect) {
                throw new Error('incorrect password');
            }
            else {
                // make auth cookie
                return res.status(200).json({
                    email: targetUser.email,
                    username: targetUser.username,
                    token: (0, token_utils_1.default)(targetUser.id)
                });
            }
        }
        else {
            throw new Error('Error in user model');
        }
    }
    // check if username exists
    catch (err) {
        res.status(400).json({
            error: "username or password incorrect"
        });
    }
}));
exports.default = router;
