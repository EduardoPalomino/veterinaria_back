import express, { Router } from 'express';
import { upload, uploadFile } from '../controllers/uploadController';

const router: Router = express.Router();

// Ruta de upload CON VERBOSIDAD
router.post('/upload',
    (req, res, next) => {
        console.log('📤 Iniciando upload...');
        next();
    },
    upload.single('file'),
    uploadFile
);

export default router;