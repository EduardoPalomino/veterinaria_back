import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Proveedor from '../models/Proveedor';


const ObjectId = mongoose.Types.ObjectId;

export const getProveedors = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Proveedor.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Proveedors', error });
    }
};

export const getProveedorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        
        res.json({
            proveedor,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Proveedor', error });
    }
};

export const saveProveedor = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Proveedor.insertMany(req.body);
            return res.status(201).json({ message: 'Proveedors creados', data: items });
        }

        const { nombre, ruc, telefono, email, direccion, contacto, observaciones } = req.body;

        if (!req.body.nombre || !req.body.ruc || !req.body.telefono || !req.body.email || !req.body.direccion || !req.body.contacto || !req.body.observaciones) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Proveedor({ nombre, ruc, telefono, email, direccion, contacto, observaciones });
        await newItem.save();

        res.status(201).json({ message: 'Proveedor creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Proveedor', error });
    }
};

export const listProveedors = async (req: Request, res: Response) => {
    try {
      await conBD();
      const proveedors = await Proveedor.find();
      res.json(proveedors);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Proveedors', error: error.message });
    }
  };

export const updateProveedor = async (req: Request, res: Response) => {
    try {
        const proveedorId = req.params.id.trim();
        await conBD();
        const { nombre, ruc, telefono, email, direccion, contacto, observaciones } = req.body;

        if (!req.body.nombre || !req.body.ruc || !req.body.telefono || !req.body.email || !req.body.direccion || !req.body.contacto || !req.body.observaciones) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(proveedorId);
        const updatedProveedor = await Proveedor.findByIdAndUpdate(objectId, {
            nombre, ruc, telefono, email, direccion, contacto, observaciones
        }, { new: true });

        if (!updatedProveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.status(200).json({ message: 'Proveedor actualizado correctamente', data: updatedProveedor });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Proveedor', error });
    }
};

export const deleteProveedor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Proveedor.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Proveedor', error });
    }
};