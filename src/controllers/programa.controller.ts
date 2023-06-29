import { Request, Response } from 'express';
import ManagerDB from '../config/managerdb';

class Programa extends ManagerDB {

  public getPrograma(req: Request, res: Response): Promise<any> {
    const query: string = 'SELECT * FROM programa';
    return Programa.executeQuery(query, req, res, 'SELECT');
  }

  public createPrograma(req: Request, res: Response): Promise<any> {
    const query: string = 'INSERT INTO programa(nombre_programa, fechacreacion_programa) VALUES($1, $2)';
    const parameters = [req.body.nombre_programa, req.body.fechacreacion_programa];
    return Programa.executeQuery(query, parameters, res, 'INSERT');
  }

  public deletePrograma(req: Request, res: Response): Promise<any> {
    if (!isNaN(Number(req.params.cod_programa))) {
      const query: string = 'DELETE FROM programa WHERE cod_programa = $1';
      const parameters = [Number(req.params.cod_programa)];
      return Programa.executeQuery(query, parameters, res, 'DELETE');
    }
    return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
  }
  
  public updatePrograma( req: Request, res: Response ): Promise<any> {
    const { cod_programa } = req.params;
    if ( cod_programa ) {
      const query: string = 'UPDATE programa SET nombre_programa = $2 WHERE cod_programa = $1';
      const parameters = [Number(cod_programa), req.body.nombre_programa];
      return Programa.executeQuery(query, parameters, res, 'UPDATE');
    }
    return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod_programa' }));
  }

  public getProgramById( req: Request, res: Response ): Promise<any> {
    const { cod_programa } = req.params;
    if ( cod_programa ) {
      const query: string = 'SELECT * FROM programa WHERE cod_programa = $1';
      const parameters = [Number(cod_programa)];
      return Programa.executeQuery(query, parameters, res, 'SELECT');
    }
    return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod_program' }));
  } 
  

}

const programaController = new Programa();
export default programaController;