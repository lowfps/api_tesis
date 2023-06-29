"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programa_controller_1 = __importDefault(require("../controllers/programa.controller"));
class Programa {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', programa_controller_1.default.getPrograma);
        this.router.get('/:cod_programa', programa_controller_1.default.getProgramById);
        this.router.post('/create', programa_controller_1.default.createPrograma);
        this.router.delete('/:cod_programa', programa_controller_1.default.deletePrograma);
        this.router.put('/update/:cod_programa', programa_controller_1.default.updatePrograma);
    }
}
const proAcaRoutes = new Programa();
exports.default = proAcaRoutes.router;
