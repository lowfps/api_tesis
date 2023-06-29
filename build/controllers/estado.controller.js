"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class EstadoController extends managerdb_1.default {
    getEstado(req, res) {
        const query = 'SELECT * FROM estado';
        return EstadoController.executeQuery(query, req, res, 'SELECT');
    }
    createEstado(req, res) {
        const query = 'INSERT INTO estado(id_estado, detalle_estado) VALUES($1, $2)';
        const parameters = [req.body.id_estado, req.body.detalle_estado];
        return EstadoController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteEstado(req, res) {
        if (!isNaN(Number(req.params.id_estado))) {
            const query = 'DELETE FROM estado WHERE id_estado = $1';
            const parameters = [Number(req.params.id_estado)];
            return EstadoController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Identificador invalido' }));
    }
}
const estadoController = new EstadoController();
exports.default = estadoController;
