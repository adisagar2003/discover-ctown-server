// @ts-nocheck

import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        // verify token
        const user = jwt.verify(token, `${process.env.JWT_SECRET}`);
        req.user = user;
        next();
    }   catch (err) {
        res.clearCookie("token");
        return res.redirect("/error");
    }
}