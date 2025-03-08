import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Cliente from '../models/Cliente';


const ObjectId = mongoose.Types.ObjectId;

export const getClientes = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Cliente.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Clientes', error });
    }
};

export const getClienteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        
        res.json({
            cliente,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Cliente', error });
    }
};

export const saveCliente = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Cliente.insertMany(req.body);
            return res.status(201).json({ message: 'Clientes creados', data: items });
        }

        const { nombres, apellidos, dni, telefono, direccion, email, indicacion_general } = req.body;

        if (!req.body.nombres || !req.body.apellidos || !req.body.dni || !req.body.telefono || !req.body.direccion || !req.body.email || !req.body.indicacion_general) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Cliente({ nombres, apellidos, dni, telefono, direccion, email, indicacion_general });
        await newItem.save();

        res.status(201).json({ message: 'Cliente creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Cliente', error });
    }
};

export const listClientes = async (req: Request, res: Response) => {
    try {
      await conBD();
      const clientes = await Cliente.find();
      res.json(clientes);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Clientes', error: error.message });
    }
  };

export const updateCliente = async (req: Request, res: Response) => {
    try {
        const clienteId = req.params.id.trim();
        await conBD();
        const { nombres, apellidos, dni, telefono, direccion, email, indicacion_general } = req.body;

        if (!req.body.nombres || !req.body.apellidos || !req.body.dni || !req.body.telefono || !req.body.direccion || !req.body.email || !req.body.indicacion_general) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(clienteId);
        const updatedCliente = await Cliente.findByIdAndUpdate(objectId, {
            nombres, apellidos, dni, telefono, direccion, email, indicacion_general
        }, { new: true });

        if (!updatedCliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.status(200).json({ message: 'Cliente actualizado correctamente', data: updatedCliente });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Cliente', error });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Cliente.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        res.json({ message: 'Cliente eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Cliente', error });
    }
};