import multer from 'multer';
import __dirname from '../utils.js';
import getLogger from '../utils/log.utils.js';

const log = getLogger();
// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${__dirname}/public/images`;

    // Verificar el tipo de archivo y establecer la carpeta dedestino
    if (file.fieldname === 'profileImage') {
      uploadPath = `${__dirname}/public/images/profiles`;
    } else if (file.fieldname === 'thumbnails') {
      uploadPath = `${__dirname}/public/images/products`;
    } else if (file.fieldname === 'documents') {
      uploadPath = `${__dirname}/public/images/documents`;
    }
    // Guardar la ruta del archivo en el objeto de la solicitud
    req.uploadPath = uploadPath;

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    log.info('Multer: ', file);
    const filePath = `${Date.now()}-${file.originalname}`;
    log.info('Multer - filePath: ' + filePath);
    req.filePath = filePath;
    cb(null, filePath);
  },
});

export const uploader = multer({
  storage,
  onError: (err, next) => {
    log.error(err);
    next();
  },
});
