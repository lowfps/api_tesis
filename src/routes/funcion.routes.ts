import { Router } from 'express';
import funcionController from '../controllers/funcion.controller';

class Funcion {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', funcionController.getFuncion);
        this.router.post('/create', funcionController.createFuncion);
        this.router.delete('/:cod_funcionalidad', funcionController.deleteFuncion);
        this.router.put('/:cod_funcionalidad', funcionController.updateFuncionUsuario);
    }
}

const funcionRoutes = new Funcion();
export default funcionRoutes.router;