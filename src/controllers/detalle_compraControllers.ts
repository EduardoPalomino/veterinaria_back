import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Detalle_compra from '../models/Detalle_compra';
import Compra from '../models/Compra';
import Producto from '../models/Producto';

const ObjectId = mongoose.Types.ObjectId;

export const getDetalle_compras = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Detalle_compra.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Detalle_compras', error });
    }
};

export const getDetalle_compraById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const detalle_compra = await Detalle_compra.findById(id);

        if (!detalle_compra) {
            return res.status(404).json({ message: 'Detalle_compra no encontrado' });
        }

        const compra = await Compra.findById(detalle_compra.compra_id);
        const producto = await Producto.findById(detalle_compra.producto_id);
        res.json({
            detalle_compra,
            compra: compra,
            producto: producto
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Detalle_compra', error });
    }
};

export const saveDetalle_compra = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Detalle_compra.insertMany(req.body);
            return res.status(201).json({ message: 'Detalle_compras creados', data: items });
        }

        const { compra_id, producto_id, cantidad, precio_compra } = req.body;

        if (!req.body.compra_id || !req.body.producto_id || !req.body.cantidad || !req.body.precio_compra) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Detalle_compra({ compra_id, producto_id, cantidad, precio_compra });
        await newItem.save();

        res.status(201).json({ message: 'Detalle_compra creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Detalle_compra', error });
    }
};

export const listDetalle_compras = async (req: Request, res: Response) => {
    try {
      await conBD();
      const detalle_compras = await Detalle_compra.find();
      res.json(detalle_compras);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Detalle_compras', error: error.message });
    }
  };

export const updateDetalle_compra = async (req: Request, res: Response) => {
    try {
        const detalle_compraId = req.params.id.trim();
        await conBD();
        const { compra_id, producto_id, cantidad, precio_compra } = req.body;

        if (!req.body.compra_id || !req.body.producto_id || !req.body.cantidad || !req.body.precio_compra) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(detalle_compraId);
        const updatedDetalle_compra = await Detalle_compra.findByIdAndUpdate(objectId, {
            compra_id, producto_id, cantidad, precio_compra
        }, { new: true });

        if (!updatedDetalle_compra) {
            return res.status(404).json({ message: 'Detalle_compra no encontrado' });
        }

        res.status(200).json({ message: 'Detalle_compra actualizado correctamente', data: updatedDetalle_compra });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Detalle_compra', error });
    }
};

export const deleteDetalle_compra = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Detalle_compra.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Detalle_compra no encontrado' });
        }

        res.json({ message: 'Detalle_compra eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Detalle_compra', error });
    }
};