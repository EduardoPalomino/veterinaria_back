import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

// 1. Ruta ABSOLUTA con path.resolve()
//const uploadsDir = path.resolve(__dirname, '../../uploads');
const uploadsDir = path.join(process.cwd(), 'uploads');
// 2. Verificación EXTENDIDA del directorio
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('✅ Directorio creado:', uploadsDir);
} else {
    console.log('ℹ️ Directorio ya existe:', uploadsDir);
}

// 3. Storage CON DEBUG MEJORADO
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('📁 Intentando guardar en:', uploadsDir);
        fs.access(uploadsDir, fs.constants.W_OK, (err) => {
            if (err) {
                console.error('❌ Error de escritura:', err);
                return cb(err, '');
            }
            cb(null, uploadsDir);
        });
    },
    filename: (req, file, cb) => {
        if (!file.originalname) {
            console.error('⚠️ Archivo sin nombre original');
            return cb(new Error('Nombre de archivo inválido'), '');
        }
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`;
        console.log('🆕 Nombre generado:', filename);
        cb(null, filename);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!['.jpg','.jpeg','.png'].includes(ext)) {
            console.error('🚫 Extensión no permitida:', ext);
            return cb(new Error('Solo imágenes JPG/PNG'));
        }
        cb(null, true);
    }
});

export const uploadFile = async (req: Request, res: Response) => {
    if (!req.file) {
        console.error('⛔ No file in request');
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // VERIFICACIÓN FÍSICA del archivo
    const filePath = path.join(uploadsDir, req.file.filename);
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        console.log('✔️ Archivo físico confirmado en:', filePath);

        res.json({
            success: true,
            url: `/uploads/${req.file.filename}`,
            path: filePath, // Para debug
            size: req.file.size
        });
    } catch (err) {
        console.error('💥 El archivo no se guardó físicamente:', err);
        res.status(500).json({
            error: 'El archivo no se guardó en el servidor',
            debug: { rutaIntentada: filePath }
        });
    }
};