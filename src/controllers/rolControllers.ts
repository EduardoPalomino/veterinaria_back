import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Rol from '../models/Rol';


const ObjectId = mongoose.Types.ObjectId;

export const getRols = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Rol.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Rols', error });
    }
};

export const getRolById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const rol = await Rol.findById(id);

        if (!rol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        
        res.json({
            rol,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Rol', error });
    }
};

export const saveRol = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Rol.insertMany(req.body);
            return res.status(201).json({ message: 'Rols creados', data: items });
        }

        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Rol({ descripcion });
        await newItem.save();

        res.status(201).json({ message: 'Rol creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Rol', error });
    }
};

export const listRols = async (req: Request, res: Response) => {
    try {
      await conBD();
      const rols = await Rol.find();
      res.json(rols);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Rols', error: error.message });
    }
  };

export const updateRol = async (req: Request, res: Response) => {
    try {
        const rolId = req.params.id.trim();
        await conBD();
        const { descripcion } = req.body;

        if (!req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(rolId);
        const updatedRol = await Rol.findByIdAndUpdate(objectId, {
            descripcion
        }, { new: true });

        if (!updatedRol) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.status(200).json({ message: 'Rol actualizado correctamente', data: updatedRol });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Rol', error });
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Rol.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Rol', error });
    }
};