"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
/*
Get users, delete user by id, get user by id
*/
router.get('/', (req, res) => {
    // Get all users from prisma 
    try {
        res.status(200).json({
            users: []
        });
    }
    catch (err) {
        res.status(400).json({
            error: err
        });
    }
});
