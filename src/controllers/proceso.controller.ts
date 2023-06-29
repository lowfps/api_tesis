import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class ProcesoController extends ManagerDB {

    public getProceso(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM proceso';
        return ProcesoController.executeQuery(query, req, res, 'SELECT');
    }

    public createProceso(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO proceso(cod_programa, fechainicio_proceso, fechafin_proceso, detalle_proceso) VALUES($1, $2, $3, $4)';
        const parameters = [req.body.cod_programa, req.body.fechainicio_proceso, req.body.fechafin_proceso, req.body.detalle_proceso];
        return ProcesoController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteProceso(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_proceso))) {
            const query: string = 'DELETE FROM proceso WHERE id_proceso = $1';
            const parameters = [Number(req.params.id_proceso)];
            return ProcesoController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    // public updateFuncionUsuario(req: Request, res: Response): Promise<any> {
    //     if (!isNaN(Number(req.params.codRol))) {
    //         delete req.body.codrol;
    //         const query: string = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
    //         const parameters = [Number(req.params.codRol), req.body.namerol];
    //         return ProcesoController.executeQuery(query, parameters, res, 'UPDATE');
    //     }
    //     return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    // }
}

const funcionUsuarioController = new ProcesoController();
export default funcionUsuarioController;