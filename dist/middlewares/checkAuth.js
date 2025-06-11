"use strict";
// @ts-nocheck
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
exports.checkIfUserIsAdmin = exports.cookieJwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../types/enums");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        // verify token
        const user = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
        req.user = user;
        next();
    }
    catch (err) {
        res.clearCookie("token");
        return res.redirect("/error");
    }
};
exports.cookieJwtAuth = cookieJwtAuth;
const checkIfUserIsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    console.log(token);
    try {
        const { user } = jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`); // returns id
        const targetUser = yield prisma.user.findUnique({ where: { id: user.id } });
        console.log(targetUser);
        if (targetUser.role == enums_1.UserRole.ADMIN) {
            next();
        }
        else {
            throw new Error("Admin privilleges are not there");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            error: "No admin rights"
        });
    }
});
exports.checkIfUserIsAdmin = checkIfUserIsAdmin;
