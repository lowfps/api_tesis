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
const managerdb_1 = __importDefault(require("../config/managerdb"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserController extends managerdb_1.default {
    getUsers(req, res) {
        const query = 'SELECT * FROM usuario';
        return UserController.executeQuery(query, req, res, 'SELECT');
    }
    createUser(req, res) {
        //! delete req.body.token;
        const data = bcrypt.hashSync(req.body.clave_usuario, 10);
        const query = 'INSERT INTO usuario(cod_rol, nombre_usuario, correo_usuario, clave_usuario) VALUES($1, $2, $3, $4)';
        const parameters = [req.body.cod_rol, req.body.nombre_usuario, req.body.correo_usuario, data];
        // return UserController.executeQuery(query, parameters, res, 'INSERT');
        return UserController.executeQuery(query, parameters, res, 'INSERT-USER');
    }
    deleteUser(req, res) {
        if (!isNaN(Number(req.params.cod_usuario))) {
            const query = 'DELETE FROM usuario WHERE cod_usuario = $1';
            const parameters = [Number(req.params.cod_usuario)];
            return UserController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    updateUser(req, res) {
        if (!isNaN(Number(req.params.cod_usuario))) {
            delete req.body.coduser;
            const query = 'UPDATE usuario SET cod_rol=$2, correo_usuario=$3, clave_usuario=$4 WHERE cod_usuario=$1';
            const parameters = [Number(req.params.cod_usuario), req.body.cod_rol, req.body.correo_usuario, req.body.clave_usuario];
            return UserController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }
    findUserByEmail(correo_usuario, res) {
        const query = `
          SELECT *
          FROM usuario
          WHERE correo_usuario = $1
        `;
        const values = [correo_usuario];
        let auth = true;
        return UserController.executeQuery(query, values, res, 'SELECT', auth);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Consulta la base de datos para obtener el usuario con el correo especificado
            const user = yield userController.findUserByEmail(req.body.correo_usuario, res);
            // Si el usuario no existe, devuelve falso
            if (!user)
                return new Promise((resolve) => {
                    resolve(false);
                });
            // Compara la contraseña proporcionada con el hash de la contraseña del usuario en la base de datos
            //const passwordIsValid = bcrypt.compare(clave_usuario, user.clave_usuario);
            const passwordIsValid = bcrypt.compare(req.body.clave_usuario, user.passwordHash);
            // Si las contraseñas coinciden, devuelve verdadero
            // Si no coinciden, devuelve falso
            return new Promise((resolve) => {
                resolve(passwordIsValid);
            });
        });
    }
}
const userController = new UserController();
exports.default = userController;
