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
const express_1 = require("express");
const checkAuth_1 = require("../middlewares/checkAuth");
const router = (0, express_1.Router)();
// checks if the user calling the route is admin
router.get("/admin", checkAuth_1.checkIfUserIsAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        response: "Success, admin rights found"
    });
}));
exports.default = router;
