"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const managerdb_1 = __importDefault(require("../config/managerdb"));
class FuncionUsuarioController extends managerdb_1.default {
    getFuncionUsuario(req, res) {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query = 'SELECT * FROM funcion_usuario';
        return FuncionUsuarioController.executeQuery(query, req, res, 'SELECT');
    }
    createFuncionUsuario(req, res) {
        const query = 'INSERT INTO funcion_usuario(id_fun_usr, id_rol, id_funcion) VALUES($1, $2, $3)';
        const parameters = [req.body.id_fun_usr, req.body.id_rol, req.body.id_funcion];
        return FuncionUsuarioController.executeQuery(query, parameters, res, 'INSERT');
    }
    deleteFuncionUsuario(req, res) {
        if (!isNaN(Number(req.params.id_fun_usr))) {
            const query = 'DELETE FROM funcion_usuario WHERE id_fun_usr = $1';
            const parameters = [Number(req.params.id_fun_usr)];
            return FuncionUsuarioController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateFuncionUsuario(req, res) {
        if (!isNaN(Number(req.params.codRol))) {
            delete req.body.codrol;
            const query = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.codRol), req.body.namerol];
            return FuncionUsuarioController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
}
const funcionUsuarioController = new FuncionUsuarioController();
exports.default = funcionUsuarioController;
