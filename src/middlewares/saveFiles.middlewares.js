import multer from 'multer';
import __dirname from '../utils.js';

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = `${__dirname}/public/images`;

    // Verificar el tipo de archivo y establecer la carpeta dedestino
    if (file.fieldname === 'profileImage') {
      console.log('****** pasó por multer ******');
      uploadPath = `${__dirname}/public/images/profiles`;
    } else if (file.fieldname === 'thumbmails') {
      console.log('****** pasó por multer ******');
      uploadPath = `${__dirname}/public/images/products`;
    } else if (file.fieldname === 'documents') {
      console.log('****** pasó por multer ******');
      uploadPath = `${__dirname}/public/images/documents`;
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log('Multer: ', file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage,
  onError: (err, next) => {
    console.error(err);
    next();
  },
});
