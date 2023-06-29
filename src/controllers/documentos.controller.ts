import { json, Request, Response } from 'express';
import ManagerDB from '../config/managerdb';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


class DocumentosController extends ManagerDB {

    public getDocumentos(req: Request, res: Response): Promise<any> {

      // const query: string = 'SELECT * FROM recurso WHERE id_user = $1';
        const query: string = 'SELECT r.*, p.* from recurso r inner join programa p on r.cod_programa = p.cod_programa WHERE r.id_user = $1';
        const parameters = [Number(req.params.id_user)];

        return DocumentosController.executeQuery(query, parameters, res, 'SELECT');
    }

    public async getDocumentosByFileId( req: Request, res: Response): Promise<any>{
      const idFile = req.params.id_file
      const pathImage = path.join( __dirname, `/uploads/${idFile}`);
      return res.download( pathImage );
    }

    public async createDocumentos(req: any, res: Response){
      try {
        const { file } = req.files;
        const { id_user } = req.params;
        const estado       = Number(req.body.estado);
        const id_program   = Number(req.body.cod_programa);
        const nameFile: any = await uploadFile( req.files );
        let typeFile: any = ''; 
        switch (nameFile.extension) {
          case 'docx':
            typeFile = 1
            break;
          case 'pdf':
            typeFile = 2
            break;
          case 'xlsx':
            // Excel
            typeFile = 3
          default:
            break;
        }
        const query: string = 'INSERT INTO recurso(cod_proceso, nombrepublico_recurso, nombreprivado_recurso, tamanno, tipo_recurso, estado,id_user, cod_programa, desc_recurso ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        const parameters = [req.body.cod_proceso, req.body.nombrepublico_recurso, nameFile.nameTmp, file.size, typeFile, estado, id_user, id_program, req.body.desc_recurso];
        return DocumentosController.executeQuery(query, parameters, res, 'INSERT');
      } catch (msg) {

        return res.status(401).json({ 
          msg   
        })
      }
    }

    public deleteDocumentos(req: Request, res: Response): Promise<any> {
        if (!isNaN(Number(req.params.id_documentos))) {
            const idFile = req.params.id_file;
            const pathImage = path.join( __dirname, `/uploads/${idFile}` );
            if ( fs.existsSync( pathImage ) ) {
              fs.unlinkSync( pathImage );
            }
            const query: string = 'DELETE FROM recurso WHERE cod_recurso = $1';
            const parameters = [Number(req.params.id_documentos)];
            return DocumentosController.executeQuery(query, parameters, res, 'DELETE');
        }
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod' }));
    }

    public async updateDocumentos(req: any, res: Response): Promise<any> {
      try {
        const { id_documentos } = req.params;
        const { id_user } = req.params;
        const id_program   = Number(req.body.cod_programa);
        const estado  = Number(req.body.estado);

        if( req.files !== null ) {
          const { file } = req.files;
          const nameFile: any = await uploadFile( req.files );
          let typeFile: any = ''; 
          switch (nameFile.extension) {
            case 'docx':
              typeFile = 1
              break;
            case 'pdf':
              typeFile = 2
              break;
            case 'xlsx':
              // Excel
              typeFile = 3
            default:
              break;
          }
          
          if ( id_documentos ) {
            const query: string = 'UPDATE recurso SET nombrepublico_recurso = $2, nombreprivado_recurso = $3, desc_recurso = $4, estado = $5 WHERE cod_recurso = $1';
            const parameters = [Number(id_documentos), req.body.nombrepublico_recurso, nameFile.nameTmp, req.body.desc_recurso, estado ];
            return DocumentosController.executeQuery(query, parameters, res, 'UPDATE');
          }
        }
        else {
          if ( id_documentos ) {
            const query: string = 'UPDATE recurso SET nombrepublico_recurso = $2, desc_recurso = $3, estado = $4 WHERE cod_recurso = $1';
            const parameters = [Number(id_documentos), req.body.nombrepublico_recurso, req.body.desc_recurso, estado ];
            return DocumentosController.executeQuery(query, parameters, res, 'UPDATE');
          }
        }
        
      } catch (error) {
        console.log(error);
        return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod_programa' }));
      }

    }

    public getDocumentById( req: Request, res: Response ): Promise<any> {
      const { id_documentos } = req.params;
      if ( id_documentos ) {
        const query: string = 'SELECT * FROM recurso WHERE cod_recurso = $1';
        const parameters = [Number(id_documentos)];
        return DocumentosController.executeQuery(query, parameters, res, 'SELECT');
      }
      return Promise.resolve(res.status(400).json({ 'message': 'Invalid cod_program' }));
    } 

}

const uploadFile = async ( files: any , folder = '' ) => {
  return new Promise(( resolve, reject ) =>{
  
  const { file }  = files;
  const nameCut   = file.name.split('.');
  const extension = nameCut[ nameCut.length-1 ];
  
  // Check Extension File
  const allowExtension = ['pdf', 'docx', 'xlsx'];
  if( !allowExtension.includes( extension ) ) {
    return reject(`La extensión ${extension} no es permitida, extensiones validas: ${allowExtension}`);
  }
  
  const nameTmp = file.name;
  const uploadPath = path.join(__dirname + '/uploads', folder, nameTmp);
  file.mv(uploadPath, function(err: any) {
      if (err) {
        return reject(err)
      }
      let data = { 
        nameTmp,
        extension,
        uploadPath
      }
      resolve( data )
    });
  });
}

const documentosController = new DocumentosController();
export default documentosController;