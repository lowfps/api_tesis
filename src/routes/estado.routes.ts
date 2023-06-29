import { Router } from 'express';
import EstadoController from '../controllers/estado.controller';

class Estado {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/', EstadoController.getEstado);
        this.router.post('/create', EstadoController.createEstado);
        this.router.delete('/:id_estado', EstadoController.deleteEstado);
        // this.router.put('/update/:id_estado', EstadoController.updateEstado);
    }
}

const funcionUsuarioRoutes = new Estado();
export default funcionUsuarioRoutes.router;