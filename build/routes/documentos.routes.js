"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentos_controller_1 = __importDefault(require("../controllers/documentos.controller"));
class DocumentosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:id_user', documentos_controller_1.default.getDocumentos);
        this.router.get('/documento/:id_documentos', documentos_controller_1.default.getDocumentById);
        this.router.get('/file/:id_file', documentos_controller_1.default.getDocumentosByFileId);
        this.router.post('/create/:id_user', documentos_controller_1.default.createDocumentos);
        this.router.delete('/:id_documentos/:id_file', documentos_controller_1.default.deleteDocumentos);
        this.router.put('/update/:id_documentos', documentos_controller_1.default.updateDocumentos);
    }
}
const rolRoutes = new DocumentosRoutes();
exports.default = rolRoutes.router;
