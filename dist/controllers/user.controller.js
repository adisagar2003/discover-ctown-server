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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
/*
Get users, delete user by id, get user by id
*/
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all users from prisma 
    const users = yield prisma.user.findMany();
    try {
        res.status(200).json({
            users: users
        });
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
}));
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPass = yield bcryptjs_1.default.hash(req.body.password, 10);
        const userData = {
            username: req.body.username,
            profilePicture: req.body.profilePicture,
            email: req.body.email,
            password: hashedPass,
            progress: 0,
            createdAt: new Date(),
        };
        const user = yield prisma.user.create({
            data: userData
        });
        res.status(200).json(({
            user: user
        }));
    }
    catch (err) {
        throw err;
    }
}));
exports.default = router;
