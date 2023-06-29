"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const funcion_routes_1 = __importDefault(require("./routes/funcion.routes"));
const programa_academico_routes_1 = __importDefault(require("./routes/programa_academico.routes"));
const rol_routes_1 = __importDefault(require("./routes/rol.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const documentos_routes_1 = __importDefault(require("./routes/documentos.routes"));
const proceso_routes_1 = __importDefault(require("./routes/proceso.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('PORT', process.env.PORT || 8098);
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:4200",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: true
        }));
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    start() {
        this.app.listen(this.app.get('PORT'), () => {
            console.log('Servidor en el puerto', this.app.get('PORT'));
        });
    }
    routes() {
        this.app.use('/', indexroutes_1.default);
        this.app.use('/api/funcion', funcion_routes_1.default);
        this.app.use('/api/programa', programa_academico_routes_1.default);
        this.app.use('/api/rol', rol_routes_1.default);
        this.app.use('/api/usuarios', usuario_routes_1.default);
        this.app.use('/api/recurso', documentos_routes_1.default);
        this.app.use('/api/proceso', proceso_routes_1.default);
    }
}
const server = new Server();
server.start();
