import { Router } from 'express';
import userController from '../controllers/usercontroller';

class UserRoutes {
    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    public config(): void{
        this.router.get('/', userController.getUsers);
        this.router.post('/crear', userController.createUser);
        this.router.delete('/:cod_usuario', userController.deleteUser);
        this.router.post('/login', userController.login);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;