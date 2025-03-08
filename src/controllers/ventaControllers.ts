import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Venta from '../models/Venta';
import Cliente from '../models/Cliente';
import Usuario from '../models/Usuario';

const ObjectId = mongoose.Types.ObjectId;

export const getVentas = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Venta.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Ventas', error });
    }
};

export const getVentaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const venta = await Venta.findById(id);

        if (!venta) {
            return res.status(404).json({ message: 'Venta no encontrado' });
        }

        const cliente = await Cliente.findById(venta.cliente_id);
        const usuario = await Usuario.findById(venta.usuario_id);
        res.json({
            venta,
            cliente: cliente,
            usuario: usuario
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Venta', error });
    }
};

export const saveVenta = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Venta.insertMany(req.body);
            return res.status(201).json({ message: 'Ventas creados', data: items });
        }

        const { fecha, total, cliente_id, usuario_id } = req.body;

        if (!req.body.fecha || !req.body.total || !req.body.cliente_id || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Venta({ fecha, total, cliente_id, usuario_id });
        await newItem.save();

        res.status(201).json({ message: 'Venta creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Venta', error });
    }
};

export const listVentas = async (req: Request, res: Response) => {
    try {
      await conBD();
      const ventas = await Venta.find();
      res.json(ventas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Ventas', error: error.message });
    }
  };

export const updateVenta = async (req: Request, res: Response) => {
    try {
        const ventaId = req.params.id.trim();
        await conBD();
        const { fecha, total, cliente_id, usuario_id } = req.body;

        if (!req.body.fecha || !req.body.total || !req.body.cliente_id || !req.body.usuario_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(ventaId);
        const updatedVenta = await Venta.findByIdAndUpdate(objectId, {
            fecha, total, cliente_id, usuario_id
        }, { new: true });

        if (!updatedVenta) {
            return res.status(404).json({ message: 'Venta no encontrado' });
        }

        res.status(200).json({ message: 'Venta actualizado correctamente', data: updatedVenta });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Venta', error });
    }
};

export const deleteVenta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Venta.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Venta no encontrado' });
        }

        res.json({ message: 'Venta eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Venta', error });
    }
};