import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class RolController extends ManagerDB {

    public getRol(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM rol';
        return RolController.executeQuery(query, req, res, 'SELECT');
    }

    public createRol(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO rol(cod_rol, detalle_rol) VALUES($1, $2)';
        const parameters = [req.body.cod_rol, req.body.detalle_rol];
        return RolController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteRol(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_rol))) {
            const query: string = 'DELETE FROM rol WHERE cod_rol = $1';
            const parameters = [Number(req.params.cod_rol)];
            return RolController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateRolUsuario(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_rol))) {
            delete req.body.cod_rol;
            const query: string = 'UPDATE rol SET detalle_rol = $2 WHERE cod_rol = $1';
            const parameters = [Number(req.params.cod_rol), req.body.detalle_rol];
            return RolController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }
}

const rolController = new RolController();
export default rolController;