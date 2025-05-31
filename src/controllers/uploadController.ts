import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.join(__dirname, '../../uploads');

// Crear carpeta si no existe
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export const uploadFile = (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    res.json({
        success: true,
        url: fileUrl,
        filename: req.file.filename
    });
};