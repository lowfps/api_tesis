"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fun_usr_controller_1 = __importDefault(require("../controllers/fun_usr.controller"));
class FuncionUsuario {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', fun_usr_controller_1.default.getFuncionUsuario);
        this.router.post('/create', fun_usr_controller_1.default.createFuncionUsuario);
        this.router.delete('/:id_fun_usr', fun_usr_controller_1.default.deleteFuncionUsuario);
        this.router.put('/update/:codRol', fun_usr_controller_1.default.updateFuncionUsuario);
    }
}
const funcionUsuarioRoutes = new FuncionUsuario();
exports.default = funcionUsuarioRoutes.router;
