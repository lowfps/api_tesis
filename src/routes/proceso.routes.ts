import { Router } from 'express';
import ProcesoController from '../controllers/proceso.controller';

class Proceso {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', ProcesoController.getProceso);
        this.router.post('/create', ProcesoController.createProceso);
        this.router.delete('/:id_proceso', ProcesoController.deleteProceso);
        // this.router.put('/update/:codRol', ProcesoController.updateFuncionUsuario);
    }
}

const procesoRoutes = new Proceso();
export default procesoRoutes.router;