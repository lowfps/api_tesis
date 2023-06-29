import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import indexRoutes from './routes/indexroutes';

import funcionRoutes from './routes/funcion.routes';
import programRoutes from './routes/programa_academico.routes';
import rolRoutes from './routes/rol.routes';
import usuarioRoutes from './routes/usuario.routes'
import documentosRoutes from './routes/documentos.routes';
import procesoRoutes from './routes/proceso.routes';

import fileUpload from 'express-fileupload';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        this.app.set('PORT', process.env.PORT || 8098);

        this.app.use(cors({
            origin: "http://localhost:4200",
            methods: ["GET", "POST","PUT","DELETE"]
        }));
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use(fileUpload({
          useTempFiles: true,
          tempFileDir: '/tmp/',
          createParentPath: true
        }))
    }

    public start(): void {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('Servidor en el puerto', this.app.get('PORT'));
        });
    }

    public routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/funcion', funcionRoutes);
        this.app.use('/api/programa', programRoutes);
        this.app.use('/api/rol', rolRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/recurso', documentosRoutes);
        this.app.use('/api/proceso', procesoRoutes);


        

    }
}

const server = new Server();
server.start();