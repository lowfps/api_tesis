import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class EstadoController extends ManagerDB {

    public getEstado(req: Request, res: Response): Promise<any> {
        const query: string = 'SELECT * FROM estado';
        return EstadoController.executeQuery(query, req, res, 'SELECT');
    }

    public createEstado(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO estado(id_estado, detalle_estado) VALUES($1, $2)';
        const parameters = [req.body.id_estado, req.body.detalle_estado];
        return EstadoController.executeQuery(query, parameters, res, 'INSERT'); 
    }

    public deleteEstado(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_estado))) {
            const query: string = 'DELETE FROM estado WHERE id_estado = $1';
            const parameters = [Number(req.params.id_estado)];
            return EstadoController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Identificador invalido' }));
    }

    // public updateEstado(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.id_estado))) {
    //         delete req.body.codrol;
    //         const query: string = 'UPDATE estado SET detalle_estado = $2 WHERE id_estado = $1';
    //         const parameters = [Number(req.params.id_estado), req.body.detalle_estado];
    //         return EstadoController.executeQuery(query, parameters, res, 'UPDATE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Identificador invalido' }))
    // }
}

const estadoController = new EstadoController();
export default estadoController;