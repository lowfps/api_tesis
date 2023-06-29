import config from './configurationdb';
import pgPromise from 'pg-promise';

const pgpromise = pgPromise();
const pool = pgpromise(config.database);

pool.connect().then(connection => {
    console.log('Conexión establecida con ', config.database.database);
    connection.done();
}).catch(error => {
    if (error.code == '28P01'){
        console.log('Error en la autenticación, Cod de error-->', error.code);
    }
    //* console.log('Error -->', error);
});

export default pool;