import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Reporte from '../models/Reporte';
import Usuario from '../models/Usuario';

const ObjectId = mongoose.Types.ObjectId;

export const getReportes = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Reporte.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Reportes', error });
    }
};

export const getReporteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const reporte = await Reporte.findById(id);

        if (!reporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        const usuario = await Usuario.findById(reporte.usuario_id);
        res.json({
            reporte,
            usuario: usuario
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Reporte', error });
    }
};

export const saveReporte = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Reporte.insertMany(req.body);
            return res.status(201).json({ message: 'Reportes creados', data: items });
        }

        const { tipo_reporte, fecha_generado, contenido, usuario_id } = req.body;

        if (!req.body.tipo_reporte || !req.body.fecha_generado || !req.body.contenido || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Reporte({ tipo_reporte, fecha_generado, contenido, usuario_id });
        await newItem.save();

        res.status(201).json({ message: 'Reporte creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Reporte', error });
    }
};

export const listReportes = async (req: Request, res: Response) => {
    try {
      await conBD();
      const reportes = await Reporte.find();
      res.json(reportes);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Reportes', error: error.message });
    }
  };

export const updateReporte = async (req: Request, res: Response) => {
    try {
        const reporteId = req.params.id.trim();
        await conBD();
        const { tipo_reporte, fecha_generado, contenido, usuario_id } = req.body;

        if (!req.body.tipo_reporte || !req.body.fecha_generado || !req.body.contenido || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(reporteId);
        const updatedReporte = await Reporte.findByIdAndUpdate(objectId, {
            tipo_reporte, fecha_generado, contenido, usuario_id
        }, { new: true });

        if (!updatedReporte) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.status(200).json({ message: 'Reporte actualizado correctamente', data: updatedReporte });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Reporte', error });
    }
};

export const deleteReporte = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Reporte.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.json({ message: 'Reporte eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Reporte', error });
    }
};