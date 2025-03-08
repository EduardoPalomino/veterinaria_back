import fs from 'fs';
import path from 'path';

const FileName = process.argv[2];
const ModelFileName = `${FileName.charAt(0).toUpperCase() + FileName.slice(1)}`;
const fields = process.argv.slice(3); // Captura los campos pasados como argumentos
if (!FileName) {
  console.error('Por favor, proporciona el nombre del archivo de migración como argumento.');
  process.exit(1);
}
const newFileName = `${FileName}.ts`;
const migrationsDir = path.join(__dirname, '..', '', 'routes');
const migrationFile = path.join(migrationsDir, newFileName);
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}
const processedContent = writeContent(FileName, fields); // Pasa los campos como parámetros a la función writeContent
fs.writeFileSync(migrationFile, processedContent);
console.log(`Nuevo archivo TypeScript generado exitosamente en '${migrationFile}'.`);

function writeContent(w: string, fields: string[]): string {
  w = w.charAt(0).toUpperCase() + w.slice(1);
  let content: string;
  let mfields=fields;   


   content = `'use strict';

import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const router = express.Router();

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configura Multer para almacenar los archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const fileName = \`image_\${Date.now()}\${extension}\`;
    cb(null, fileName);
  }
});

const upload = multer({ storage });

// Ruta para verificar el estado del servidor
router.get('/status', async (_, res: Response) => {
  res.send({ status: 'ok' });
});

// Ruta para subir archivos
router.post(
  '/file',
  upload.single('upfile'),
  async (req: Request, res: Response) => {
    const upfile = req.file;

    if (!upfile) {
      return res.status(400).send({
        error: 'No file uploaded',
      });
    }

    const filePath = path.join('uploads', upfile.filename);

    return res.send({
      name: upfile.filename,
      url: filePath,
    });
  }
);

export default router;
`;

  return content;
}




