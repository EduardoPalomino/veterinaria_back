import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Especie from '../models/Especie';


const ObjectId = mongoose.Types.ObjectId;

export const getEspecies = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Especie.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Especies', error });
    }
};

export const getEspecieById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const especie = await Especie.findById(id);

        if (!especie) {
            return res.status(404).json({ message: 'Especie no encontrado' });
        }

        
        res.json({
            especie,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Especie', error });
    }
};

export const saveEspecie = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Especie.insertMany(req.body);
            return res.status(201).json({ message: 'Especies creados', data: items });
        }

        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Especie({ descripcion });
        await newItem.save();

        res.status(201).json({ message: 'Especie creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Especie', error });
    }
};

export const listEspecies = async (req: Request, res: Response) => {
    try {
      await conBD();
      const especies = await Especie.find();
      res.json(especies);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Especies', error: error.message });
    }
  };

export const updateEspecie = async (req: Request, res: Response) => {
    try {
        const especieId = req.params.id.trim();
        await conBD();
        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(especieId);
        const updatedEspecie = await Especie.findByIdAndUpdate(objectId, {
            descripcion
        }, { new: true });

        if (!updatedEspecie) {
            return res.status(404).json({ message: 'Especie no encontrado' });
        }

        res.status(200).json({ message: 'Especie actualizado correctamente', data: updatedEspecie });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Especie', error });
    }
};

export const deleteEspecie = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Especie.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Especie no encontrado' });
        }

        res.json({ message: 'Especie eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Especie', error });
    }
};