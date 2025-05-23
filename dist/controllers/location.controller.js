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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const places_json_1 = __importDefault(require("../data/places.json"));
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get('/location/:count', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get all users from prisma
    const locations = yield prisma.location.findMany({
        take: Number(req.params.count)
    });
    if (locations) {
        res.status(200).json({
            data: locations
        });
    }
}));
// ROUTE FOR DEVELOPMENT PURPOSES ONLY ⚠️⚠️⚠️⚠️⚠️⚠️
router.post('/location/updateSchema', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get location data to put in 
    // is the token authenticated? 
    const location = yield prisma.location.updateMany({
        data: {
            category: "Dining"
        }
    });
    res.status(200).json({
        data: location
    });
}));
router.post('/locationMap', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get location data to put in 
    // is the token authenticated as admin? 
    /*
{
      "type": "Feature",
      "properties": {
        "name": "Confideration center of Arts",
        "category": "Arts&Culture"
      },
      "geometry": {
        "coordinates": [
          -63.127150985748486,
          46.23431826761407
        ],
        "type": "Point"
      }
    }

    */
    try {
        const location = yield prisma.locationMap.create({
            data: { type: req.body.type,
                properties: req.body.properties,
                geometry: req.body.geometry,
            }
        });
        res.status(200).json({
            data: location
        });
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}));
router.get('/development/populate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(places_json_1.default.features);
    for (const elem of places_json_1.default.features) {
        yield prisma.locationMap.create({
            data: {
                properties: elem.properties,
                geometry: elem.geometry,
                type: elem.type
            }
        }).then((r) => console.log("promise solved"), () => { console.log("not solved"); });
    }
    res.status(300).json({
        message: "Check console",
        resultArray: a
    });
}));
exports.default = router;
