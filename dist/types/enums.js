"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["GUEST"] = "GUEST";
})(UserRole || (exports.UserRole = UserRole = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
    Status["PENDING"] = "PENDING";
})(Status || (exports.Status = Status = {}));
