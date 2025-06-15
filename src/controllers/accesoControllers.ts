import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Acceso from '../models/Acceso';
import Rol from '../models/Rol';

const ObjectId = mongoose.Types.ObjectId;

export const getAccesos = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Acceso.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Accesos', error });
    }
};

export const getAccesoByRolId = async (req: Request, res: Response) => {
    try {
        const { rol_id } = req.params;
        await conBD();
        const acceso = await Acceso.find({ rol_id: rol_id });

        if (!acceso) {
            return res.status(404).json({ message: 'Acceso no encontrado' });
        }
        res.json({acceso});

    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Acceso', error });
    }
};

export const getAccesoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const acceso = await Acceso.findById(id);

        if (!acceso) {
            return res.status(404).json({ message: 'Acceso no encontrado' });
        }

        const rol = await Rol.findById(acceso.rol_id);
        res.json({
            acceso,
            rol: rol
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Acceso', error });
    }
};

export const saveAcceso = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Acceso.insertMany(req.body);
            return res.status(201).json({ message: 'Accesos creados', data: items });
        }

        const { rol_id, page } = req.body;

        if (!req.body.rol_id || !req.body.page) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Acceso({ rol_id, page });
        await newItem.save();

        res.status(201).json({ message: 'Acceso creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Acceso', error });
    }
};

export const listAccesos = async (req: Request, res: Response) => {
    try {
      await conBD();
      const accesos = await Acceso.find();
      res.json(accesos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Accesos', error: error.message });
    }
  };

export const updateAcceso = async (req: Request, res: Response) => {
    try {
        const accesoId = req.params.id.trim();
        await conBD();
        const { rol_id, page } = req.body;

        if (!req.body.rol_id || !req.body.page) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(accesoId);
        const updatedAcceso = await Acceso.findByIdAndUpdate(objectId, {
            rol_id, page
        }, { new: true });

        if (!updatedAcceso) {
            return res.status(404).json({ message: 'Acceso no encontrado' });
        }

        res.status(200).json({ message: 'Acceso actualizado correctamente', data: updatedAcceso });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Acceso', error });
    }
};

export const deleteAcceso = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Acceso.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Acceso no encontrado' });
        }

        res.json({ message: 'Acceso eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Acceso', error });
    }
};