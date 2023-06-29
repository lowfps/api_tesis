import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class funcionController extends ManagerDB {

    public getFuncion(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT cod_funcionalidad, namerol FROM rol';
        const query: string = 'SELECT * FROM funcionalidad';
        return funcionController.executeQuery(query, req, res, 'SELECT');
    }

    public createFuncion(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO funcionalidad(cod_funcionalidad, detalle_funcionalidad) VALUES($1, $2)';
        const parameters = [req.body.cod_funcionalidad, req.body.detalle_funcionalidad];
        return funcionController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteFuncion(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_funcionalidad))) {
            const query: string = 'DELETE FROM funcionalidad WHERE cod_funcionalidad = $1';
            const parameters = [Number(req.params.cod_funcionalidad)];
            return funcionController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateFuncionUsuario(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.cod_funcionalidad))) {
            delete req.body.cod_funcionalidad;
            const query: string = 'UPDATE funcionalidad SET detalle_funcionalidad = $2 WHERE cod_funcionalidad = $1';
            const parameters = [Number(req.params.cod_funcionalidad), req.body.detalle_funcionalidad];
            return funcionController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }
}

const funcionUsuarioController = new funcionController();
export default funcionUsuarioController;