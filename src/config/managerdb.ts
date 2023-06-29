import { Response } from 'express';
import pool from './connectiondb';
import jwt from 'jsonwebtoken';

class ManagerDB {
    protected static async executeQuery(sql: string, parameters: any, res: Response, type: string, auth?: boolean): Promise < any > {
        //? pool.query(sql, parameters).then(out => {
        pool.result(sql, parameters).then(out => {
            switch (type.toUpperCase()) {
                case 'SELECT':
                  if( auth ) {
                    const tokenLogin = jwt.sign({'correo_usuario': parameters }, 'privatekey');
                    res.status(200).json({'token': tokenLogin, 'user': out.rows });

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
                    const token = jwt.sign({ 'cod_usuario': out, 'correo_usuario': parameters.correo_usuario }, 'privatekey');
                    const text = 'SELECT * FROM usuario WHERE correo_usuario = $1';
                    const values = [parameters[2]]
                    pool.query(text, values, ).then(result => {
                      res.status(200).json({ 'token': token, 'user': parameters[1], 'cod_usuario':result[0].cod_usuario });
                    })
                    .catch(e => console.error(e.stack))
                    break;
                default:
                    res.status(400).json({ 'answer': 'Service not implemented <--' });
                    break;
            }
        })
    }
}

export default ManagerDB;