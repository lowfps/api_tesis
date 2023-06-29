"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class RolController extends managerdb_1.default {
    getRol(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM rol';
        return RolController.executeQuery(query, req, res, 'SELECT');
    }
    createRol(req, res) {
        const query = 'INSERT INTO rol(cod_rol, detalle_rol) VALUES($1, $2)';
        const parameters = [req.body.cod_rol, req.body.detalle_rol];
        return RolController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteRol(req, res) {
        if (!isNaN(Number(req.params.cod_rol))) {
            const query = 'DELETE FROM rol WHERE cod_rol = $1';
            const parameters = [Number(req.params.cod_rol)];
            return RolController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateRolUsuario(req, res) {
        if (!isNaN(Number(req.params.cod_rol))) {
            delete req.body.cod_rol;
            const query = 'UPDATE rol SET detalle_rol = $2 WHERE cod_rol = $1';
            const parameters = [Number(req.params.cod_rol), req.body.detalle_rol];
            return RolController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const rolController = new RolController();
exports.default = rolController;
