"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proceso_controller_1 = __importDefault(require("../controllers/proceso.controller"));
class Proceso {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proceso_controller_1.default.getProceso);
        this.router.post('/create', proceso_controller_1.default.createProceso);
        this.router.delete('/:id_proceso', proceso_controller_1.default.deleteProceso);
        // this.router.put('/update/:codRol', ProcesoController.updateFuncionUsuario);
    }
}
const procesoRoutes = new Proceso();
exports.default = procesoRoutes.router;
