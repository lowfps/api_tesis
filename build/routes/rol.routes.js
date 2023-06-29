"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rol_controller_1 = __importDefault(require("../controllers/rol.controller"));
class Rol {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', rol_controller_1.default.getRol);
        this.router.post('/create', rol_controller_1.default.createRol);
        this.router.delete('/:cod_rol', rol_controller_1.default.deleteRol);
        this.router.put('/:cod_rol', rol_controller_1.default.updateRolUsuario);
    }
}
const funcionUsuarioRoutes = new Rol();
exports.default = funcionUsuarioRoutes.router;
