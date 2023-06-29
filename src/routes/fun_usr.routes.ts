import { Router } from 'express';
import funcionUsuarioController from '../controllers/fun_usr.controller';

class FuncionUsuario {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', funcionUsuarioController.getFuncionUsuario);
        this.router.post('/create', funcionUsuarioController.createFuncionUsuario);
        this.router.delete('/:id_fun_usr', funcionUsuarioController.deleteFuncionUsuario);
        this.router.put('/update/:codRol', funcionUsuarioController.updateFuncionUsuario);
    }
}

const funcionUsuarioRoutes = new FuncionUsuario();
export default funcionUsuarioRoutes.router;