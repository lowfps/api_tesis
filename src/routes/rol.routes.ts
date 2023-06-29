import { Router } from 'express';
import rolController from '../controllers/rol.controller';

class Rol {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', rolController.getRol);
        this.router.post('/create', rolController.createRol);
        this.router.delete('/:cod_rol', rolController.deleteRol);
        this.router.put('/:cod_rol', rolController.updateRolUsuario);
    }
}

const funcionUsuarioRoutes = new Rol();
export default funcionUsuarioRoutes.router;