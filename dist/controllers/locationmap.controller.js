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
Object.defineProperty(exports, "__esModule", { value: true });
// DEVELOPMENT PURPOSES ONLY 
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// get all locations
router.get('/locationMap/:count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationMaps = yield prisma.locationMap.findMany({ skip: 0, take: Number(req.params.count) });
    res.status(200).json({
        data: locationMaps
    });
}));
router.get('/locations/totalCount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationMaps = yield prisma.locationMap.aggregate({
        _count: {
            id: true
        }
    });
    res.status(200).json({
        data: locationMaps
    });
}));
// get location in terms of search param
router.get('/locationMapSearch/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationMaps = yield prisma.locationMap.findMany({ where: { properties: {
                path: ['name'], string_contains: req.params.name
            } },
        take: 10,
        skip: 0
    });
    if (!locationMaps)
        return res.status(200).json({ error: 'No locations found' });
    res.status(200).json({
        response: locationMaps
    });
}));
exports.default = router;
