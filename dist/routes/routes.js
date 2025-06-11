"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const locationmap_controller_1 = __importDefault(require("../controllers/locationmap.controller"));
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const api = (0, express_1.Router)()
    .use(user_controller_1.default)
    .use(auth_controller_1.default)
    .use(location_controller_1.default)
    .use(locationmap_controller_1.default)
    .use(admin_controller_1.default);
exports.default = (0, express_1.Router)().use('/api', api);
