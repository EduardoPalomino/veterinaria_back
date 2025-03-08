import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Historia_clinica from '../models/Historia_clinica';
import Mascota from '../models/Mascota';
import Usuario from '../models/Usuario';

const ObjectId = mongoose.Types.ObjectId;

export const getHistoria_clinicas = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Historia_clinica.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Historia_clinicas', error });
    }
};

export const getHistoria_clinicaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const historia_clinica = await Historia_clinica.findById(id);

        if (!historia_clinica) {
            return res.status(404).json({ message: 'Historia_clinica no encontrado' });
        }

        const mascota = await Mascota.findById(historia_clinica.mascota_id);
        const usuario = await Usuario.findById(historia_clinica.usuario_id);
        res.json({
            historia_clinica,
            mascota: mascota,
            usuario: usuario
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Historia_clinica', error });
    }
};

export const saveHistoria_clinica = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Historia_clinica.insertMany(req.body);
            return res.status(201).json({ message: 'Historia_clinicas creados', data: items });
        }

        const { mascota_id, fecha, motivo_consulta, diagnostico, tratamiento, observaciones, usuario_id } = req.body;

        if (!req.body.mascota_id || !req.body.fecha || !req.body.motivo_consulta || !req.body.diagnostico || !req.body.tratamiento || !req.body.observaciones || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Historia_clinica({ mascota_id, fecha, motivo_consulta, diagnostico, tratamiento, observaciones, usuario_id });
        await newItem.save();

        res.status(201).json({ message: 'Historia_clinica creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Historia_clinica', error });
    }
};

export const listHistoria_clinicas = async (req: Request, res: Response) => {
    try {
      await conBD();
      const historia_clinicas = await Historia_clinica.find();
      res.json(historia_clinicas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Historia_clinicas', error: error.message });
    }
  };

export const updateHistoria_clinica = async (req: Request, res: Response) => {
    try {
        const historia_clinicaId = req.params.id.trim();
        await conBD();
        const { mascota_id, fecha, motivo_consulta, diagnostico, tratamiento, observaciones, usuario_id } = req.body;

        if (!req.body.mascota_id || !req.body.fecha || !req.body.motivo_consulta || !req.body.diagnostico || !req.body.tratamiento || !req.body.observaciones || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(historia_clinicaId);
        const updatedHistoria_clinica = await Historia_clinica.findByIdAndUpdate(objectId, {
            mascota_id, fecha, motivo_consulta, diagnostico, tratamiento, observaciones, usuario_id
        }, { new: true });

        if (!updatedHistoria_clinica) {
            return res.status(404).json({ message: 'Historia_clinica no encontrado' });
        }

        res.status(200).json({ message: 'Historia_clinica actualizado correctamente', data: updatedHistoria_clinica });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Historia_clinica', error });
    }
};

export const deleteHistoria_clinica = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Historia_clinica.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Historia_clinica no encontrado' });
        }

        res.json({ message: 'Historia_clinica eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Historia_clinica', error });
    }
};