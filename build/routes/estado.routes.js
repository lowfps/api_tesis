"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estado_controller_1 = __importDefault(require("../controllers/estado.controller"));
class Estado {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', estado_controller_1.default.getEstado);
        this.router.post('/create', estado_controller_1.default.createEstado);
        this.router.delete('/:id_estado', estado_controller_1.default.deleteEstado);
        // this.router.put('/update/:id_estado', EstadoController.updateEstado);
    }
}
const funcionUsuarioRoutes = new Estado();
exports.default = funcionUsuarioRoutes.router;
