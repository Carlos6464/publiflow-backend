import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import { fileURLToPath } from 'url';

// Workaround para __dirname em ES Modules
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// Define o diretório de uploads relativo à raiz do projeto
const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

/**
 * Configuração do Multer para upload de arquivos
 */
export default {
  directory: uploadsFolder,
  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    // Permite apenas upload de imagens
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas.'));
    }
  },
};

