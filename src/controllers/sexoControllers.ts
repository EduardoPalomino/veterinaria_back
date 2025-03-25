import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Sexo from '../models/Sexo';


const ObjectId = mongoose.Types.ObjectId;

export const getSexos = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Sexo.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Sexos', error });
    }
};

export const getSexoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const sexo = await Sexo.findById(id);

        if (!sexo) {
            return res.status(404).json({ message: 'Sexo no encontrado' });
        }

        
        res.json({
            sexo,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Sexo', error });
    }
};

export const saveSexo = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Sexo.insertMany(req.body);
            return res.status(201).json({ message: 'Sexos creados', data: items });
        }

        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Sexo({ descripcion });
        await newItem.save();

        res.status(201).json({ message: 'Sexo creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Sexo', error });
    }
};

export const listSexos = async (req: Request, res: Response) => {
    try {
      await conBD();
      const sexos = await Sexo.find();
      res.json(sexos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Sexos', error: error.message });
    }
  };

export const updateSexo = async (req: Request, res: Response) => {
    try {
        const sexoId = req.params.id.trim();
        await conBD();
        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(sexoId);
        const updatedSexo = await Sexo.findByIdAndUpdate(objectId, {
            descripcion
        }, { new: true });

        if (!updatedSexo) {
            return res.status(404).json({ message: 'Sexo no encontrado' });
        }

        res.status(200).json({ message: 'Sexo actualizado correctamente', data: updatedSexo });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Sexo', error });
    }
};

export const deleteSexo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Sexo.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Sexo no encontrado' });
        }

        res.json({ message: 'Sexo eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Sexo', error });
    }
};