"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("../controllers/usercontroller"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usercontroller_1.default.getUsers);
        this.router.post('/crear', usercontroller_1.default.createUser);
        this.router.delete('/:cod_usuario', usercontroller_1.default.deleteUser);
        this.router.post('/login', usercontroller_1.default.login);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
