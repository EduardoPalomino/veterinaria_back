import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Raza from '../models/Raza';
import Especie from '../models/Especie';

const ObjectId = mongoose.Types.ObjectId;

export const getRazas = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Raza.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Razas', error });
    }
};

export const getRazaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const raza = await Raza.findById(id);

        if (!raza) {
            return res.status(404).json({ message: 'Raza no encontrado' });
        }

        const especie = await Especie.findById(raza.especie_id);
        res.json({
            raza,
            especie: especie
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Raza', error });
    }
};

export const saveRaza = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Raza.insertMany(req.body);
            return res.status(201).json({ message: 'Razas creados', data: items });
        }

        const { descripcion, especie_id } = req.body;

        if (!req.body.descripcion || !req.body.especie_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Raza({ descripcion, especie_id });
        await newItem.save();

        res.status(201).json({ message: 'Raza creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Raza', error });
    }
};

export const listRazas = async (req: Request, res: Response) => {
    try {
      await conBD();
      const razas = await Raza.find();
      res.json(razas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Razas', error: error.message });
    }
  };

export const updateRaza = async (req: Request, res: Response) => {
    try {
        const razaId = req.params.id.trim();
        await conBD();
        const { descripcion, especie_id } = req.body;

        if (!req.body.descripcion || !req.body.especie_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(razaId);
        const updatedRaza = await Raza.findByIdAndUpdate(objectId, {
            descripcion, especie_id
        }, { new: true });

        if (!updatedRaza) {
            return res.status(404).json({ message: 'Raza no encontrado' });
        }

        res.status(200).json({ message: 'Raza actualizado correctamente', data: updatedRaza });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Raza', error });
    }
};

export const deleteRaza = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Raza.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Raza no encontrado' });
        }

        res.json({ message: 'Raza eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Raza', error });
    }
};