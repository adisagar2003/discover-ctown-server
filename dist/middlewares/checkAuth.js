"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieJwtAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
