"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class funcionController extends managerdb_1.default {
    getFuncion(req, res) {
        // const query: string = 'SELECT cod_funcionalidad, namerol FROM rol';
        const query = 'SELECT * FROM funcionalidad';
        return funcionController.executeQuery(query, req, res, 'SELECT');
    }
    createFuncion(req, res) {
        const query = 'INSERT INTO funcionalidad(cod_funcionalidad, detalle_funcionalidad) VALUES($1, $2)';
        const parameters = [req.body.cod_funcionalidad, req.body.detalle_funcionalidad];
        return funcionController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteFuncion(req, res) {
        if (!isNaN(Number(req.params.cod_funcionalidad))) {
            const query = 'DELETE FROM funcionalidad WHERE cod_funcionalidad = $1';
            const parameters = [Number(req.params.cod_funcionalidad)];
            return funcionController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateFuncionUsuario(req, res) {
        if (!isNaN(Number(req.params.cod_funcionalidad))) {
            delete req.body.cod_funcionalidad;
            const query = 'UPDATE funcionalidad SET detalle_funcionalidad = $2 WHERE cod_funcionalidad = $1';
            const parameters = [Number(req.params.cod_funcionalidad), req.body.detalle_funcionalidad];
            return funcionController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const funcionUsuarioController = new funcionController();
exports.default = funcionUsuarioController;
