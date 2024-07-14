// @ts-nocheck

import { NextFunction } from "express";
import jwt from "jsonwebtoken";

exports.cookieJwtAuth = (req: Request, res: Response, next: NextFunction) => {
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