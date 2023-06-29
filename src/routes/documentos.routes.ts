import { Router } from 'express';
import documentosController from '../controllers/documentos.controller';

class DocumentosRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    public config(): void {
        this.router.get('/:id_user', documentosController.getDocumentos);
        this.router.get('/documento/:id_documentos', documentosController.getDocumentById);
        this.router.get('/file/:id_file', documentosController.getDocumentosByFileId);
        this.router.post('/create/:id_user', documentosController.createDocumentos);
        this.router.delete('/:id_documentos/:id_file', documentosController.deleteDocumentos);
        this.router.put('/update/:id_documentos', documentosController.updateDocumentos);
    }
}

const rolRoutes = new DocumentosRoutes();
export default rolRoutes.router;