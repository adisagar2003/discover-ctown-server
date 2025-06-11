"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 1] = "ADMIN";
    UserRole[UserRole["USER"] = 2] = "USER";
    UserRole[UserRole["GUEST"] = 3] = "GUEST";
})(UserRole || (exports.UserRole = UserRole = {}));
var Status;
(function (Status) {
    Status["ACTIVE"] = "ACTIVE";
    Status["INACTIVE"] = "INACTIVE";
    Status["PENDING"] = "PENDING";
})(Status || (exports.Status = Status = {}));
