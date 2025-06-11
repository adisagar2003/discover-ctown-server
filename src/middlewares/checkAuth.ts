// @ts-nocheck

import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../types/enums";
import { log } from "console";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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

export const checkIfUserIsAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    try {
        const {user} = jwt.verify(token, `${process.env.JWT_SECRET}`); // returns id
        const targetUser = await prisma.user.findUnique({ where : { id : user.id }});
        console.log(targetUser);
        if (targetUser.role == UserRole.ADMIN) {
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
}