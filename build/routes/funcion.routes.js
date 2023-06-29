"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const funcion_controller_1 = __importDefault(require("../controllers/funcion.controller"));
class Funcion {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', funcion_controller_1.default.getFuncion);
        this.router.post('/create', funcion_controller_1.default.createFuncion);
        this.router.delete('/:cod_funcionalidad', funcion_controller_1.default.deleteFuncion);
        this.router.put('/:cod_funcionalidad', funcion_controller_1.default.updateFuncionUsuario);
    }
}
const funcionRoutes = new Funcion();
exports.default = funcionRoutes.router;
