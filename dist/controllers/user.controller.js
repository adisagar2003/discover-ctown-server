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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkAuth_1 = require("../middlewares/checkAuth");
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
// Register user
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
// find a user by id 
router.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find user with the given id 
        const targetUser = yield prisma.user.findFirst({ where: { id: Number(req.params.id) } });
        if (!targetUser)
            return res.status(400).json({
                error: 'No user with this id found'
            });
        res.status(200).json({
            response: targetUser
        });
    }
    catch (err) {
        res.status(400).json({
            error: "Unknown error"
        });
    }
}));
// visit a location
router.post('/visitLocation', checkAuth_1.cookieJwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  add location id to locations section of the user
        // find the target user
        let targetUserId = req.user.user.id;
        const targetUser = yield prisma.user.findUnique({ where: { id: targetUserId } });
        const targetLocation = yield prisma.locationMap.findFirst({ where: { id: req.body.id } });
        if (!targetLocation)
            res.status(400).json({ error: 'target location not found' });
        let locationArray = targetUser === null || targetUser === void 0 ? void 0 : targetUser.locations;
        // update the locations array 
        if (locationArray === null || locationArray === void 0 ? void 0 : locationArray.includes(req.body.id)) {
            res.status(300).json({ message: 'already visited location' });
        }
        else {
            locationArray = [...locationArray, targetLocation.id];
            yield prisma.user.update({ where: { id: (targetUser.id) }, data: {
                    locations: locationArray
                } });
            res.status(200).json({
                message: 'Updated location'
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
router.get('/progress', checkAuth_1.cookieJwtAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // count the total number of locations
        const totalLocationCount = yield prisma.locationMap.aggregate({
            _count: true
        });
        // get the target user
        const targetUser = yield prisma.user.findFirst({ where: { id: req.user.id } });
        // get the locations length, and make it into percentage 
        const locationsLength = targetUser.locations.length;
        const percentageCalculated = locationsLength / totalLocationCount._count * 100;
        res.status(200).json({
            response: Number(parseFloat(percentageCalculated).toFixed(2))
        });
    }
    catch (err) {
        res.status(400).json({
            response: 'Unknown error occured'
        });
    }
}));
exports.default = router;
