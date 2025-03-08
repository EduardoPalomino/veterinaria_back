import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Compra from '../models/Compra';
import Proveedor from '../models/Proveedor';
import Usuario from '../models/Usuario';

const ObjectId = mongoose.Types.ObjectId;

export const getCompras = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Compra.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Compras', error });
    }
};

export const getCompraById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const compra = await Compra.findById(id);

        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrado' });
        }

        const proveedor = await Proveedor.findById(compra.proveedor_id);
        const usuario = await Usuario.findById(compra.usuario_id);
        res.json({
            compra,
            proveedor: proveedor,
            usuario: usuario
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Compra', error });
    }
};

export const saveCompra = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Compra.insertMany(req.body);
            return res.status(201).json({ message: 'Compras creados', data: items });
        }

        const { fecha, total, proveedor_id, usuario_id } = req.body;

        if (!req.body.fecha || !req.body.total || !req.body.proveedor_id || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Compra({ fecha, total, proveedor_id, usuario_id });
        await newItem.save();

        res.status(201).json({ message: 'Compra creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Compra', error });
    }
};

export const listCompras = async (req: Request, res: Response) => {
    try {
      await conBD();
      const compras = await Compra.find();
      res.json(compras);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Compras', error: error.message });
    }
  };

export const updateCompra = async (req: Request, res: Response) => {
    try {
        const compraId = req.params.id.trim();
        await conBD();
        const { fecha, total, proveedor_id, usuario_id } = req.body;

        if (!req.body.fecha || !req.body.total || !req.body.proveedor_id || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(compraId);
        const updatedCompra = await Compra.findByIdAndUpdate(objectId, {
            fecha, total, proveedor_id, usuario_id
        }, { new: true });

        if (!updatedCompra) {
            return res.status(404).json({ message: 'Compra no encontrado' });
        }

        res.status(200).json({ message: 'Compra actualizado correctamente', data: updatedCompra });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Compra', error });
    }
};

export const deleteCompra = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Compra.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Compra no encontrado' });
        }

        res.json({ message: 'Compra eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Compra', error });
    }
};