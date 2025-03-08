import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Detalle_venta from '../models/Detalle_venta';
import Venta from '../models/Venta';
import Producto from '../models/Producto';

const ObjectId = mongoose.Types.ObjectId;

export const getDetalle_ventas = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Detalle_venta.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Detalle_ventas', error });
    }
};

export const getDetalle_ventaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const detalle_venta = await Detalle_venta.findById(id);

        if (!detalle_venta) {
            return res.status(404).json({ message: 'Detalle_venta no encontrado' });
        }

        const venta = await Venta.findById(detalle_venta.venta_id);
        const producto = await Producto.findById(detalle_venta.producto_id);
        res.json({
            detalle_venta,
            venta: venta,
            producto: producto
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Detalle_venta', error });
    }
};

export const saveDetalle_venta = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Detalle_venta.insertMany(req.body);
            return res.status(201).json({ message: 'Detalle_ventas creados', data: items });
        }

        const { venta_id, producto_id, cantidad, precio_venta } = req.body;

        if (!req.body.venta_id || !req.body.producto_id || !req.body.cantidad || !req.body.precio_venta) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Detalle_venta({ venta_id, producto_id, cantidad, precio_venta });
        await newItem.save();

        res.status(201).json({ message: 'Detalle_venta creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Detalle_venta', error });
    }
};

export const listDetalle_ventas = async (req: Request, res: Response) => {
    try {
      await conBD();
      const detalle_ventas = await Detalle_venta.find();
      res.json(detalle_ventas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Detalle_ventas', error: error.message });
    }
  };

export const updateDetalle_venta = async (req: Request, res: Response) => {
    try {
        const detalle_ventaId = req.params.id.trim();
        await conBD();
        const { venta_id, producto_id, cantidad, precio_venta } = req.body;

        if (!req.body.venta_id || !req.body.producto_id || !req.body.cantidad || !req.body.precio_venta) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(detalle_ventaId);
        const updatedDetalle_venta = await Detalle_venta.findByIdAndUpdate(objectId, {
            venta_id, producto_id, cantidad, precio_venta
        }, { new: true });

        if (!updatedDetalle_venta) {
            return res.status(404).json({ message: 'Detalle_venta no encontrado' });
        }

        res.status(200).json({ message: 'Detalle_venta actualizado correctamente', data: updatedDetalle_venta });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Detalle_venta', error });
    }
};

export const deleteDetalle_venta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Detalle_venta.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Detalle_venta no encontrado' });
        }

        res.json({ message: 'Detalle_venta eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Detalle_venta', error });
    }
};