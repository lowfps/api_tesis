"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectiondb_1 = __importDefault(require("./connectiondb"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ManagerDB {
    static executeQuery(sql, parameters, res, type, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            //? pool.query(sql, parameters).then(out => {
            connectiondb_1.default.result(sql, parameters).then(out => {
                switch (type.toUpperCase()) {
                    case 'SELECT':
                        if (auth) {
                            const tokenLogin = jsonwebtoken_1.default.sign({ 'correo_usuario': parameters }, 'privatekey');
                            res.status(200).json({ 'token': tokenLogin, 'user': out.rows });
                        }
                        else {
                            res.status(200).json(out.rows);
                        }
                        break;
                    case 'INSERT':
                        res.status(200).json({ 'mensaje': 'Registro creado', 'id': out.rows });
                        break;
                    case 'DELETE':
                        out.rowCount > 0
                            ? res.status(200).json({ 'mensaje': 'Usuario eliminado', 'Registros afectados': out.rowCount })
                            : res.status(400).json({ 'mensaje': 'Usuario no existe' });
                        break;
                    case 'UPDATE':
                        out.rowCount > 0
                            ? res.status(200).json({ 'mensaje': 'Registro actualizado', 'Registros afectados': out.rowCount })
                            : res.status(400).json({ 'mensaje': 'Usuario no existe' });
                        break;
                    case 'INSERT-USER':
                        /**Cambio del user */
                        const token = jsonwebtoken_1.default.sign({ 'cod_usuario': out, 'correo_usuario': parameters.correo_usuario }, 'privatekey');
                        const text = 'SELECT * FROM usuario WHERE correo_usuario = $1';
                        const values = [parameters[2]];
                        connectiondb_1.default.query(text, values).then(result => {
                            res.status(200).json({ 'token': token, 'user': parameters[1], 'cod_usuario': result[0].cod_usuario });
                        })
                            .catch(e => console.error(e.stack));
                        break;
                    default:
                        res.status(400).json({ 'answer': 'Service not implemented <--' });
                        break;
                }
            });
        });
    }
}
exports.default = ManagerDB;
