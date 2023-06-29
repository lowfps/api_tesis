import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class FuncionUsuarioController extends ManagerDB {

    public getFuncionUsuario(req: Request, res: Response): Promise<any> {
        // const query: string = 'SELECT codrol, namerol FROM rol';
        const query: string = 'SELECT * FROM funcion_usuario';
        return FuncionUsuarioController.executeQuery(query, req, res, 'SELECT');
    }

    public createFuncionUsuario(req: Request, res: Response): Promise<any> {
        const query: string = 'INSERT INTO funcion_usuario(id_fun_usr, id_rol, id_funcion) VALUES($1, $2, $3)';
        const parameters = [req.body.id_fun_usr, req.body.id_rol, req.body.id_funcion];
        return FuncionUsuarioController.executeQuery(query, parameters, res, 'INSERT');
    }

    public deleteFuncionUsuario(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_fun_usr))) {
            const query: string = 'DELETE FROM funcion_usuario WHERE id_fun_usr = $1';
            const parameters = [Number(req.params.id_fun_usr)];
            return FuncionUsuarioController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public updateFuncionUsuario(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.codRol))) {
            delete req.body.codrol;
            const query: string = 'UPDATE rol SET namerol = $2 WHERE codrol = $1';
            const parameters = [Number(req.params.codRol), req.body.namerol];
            return FuncionUsuarioController.executeQuery(query, parameters, res, 'UPDATE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }))
    }
}

const funcionUsuarioController = new FuncionUsuarioController();
export default funcionUsuarioController;