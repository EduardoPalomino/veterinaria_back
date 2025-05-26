import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Pago from '../models/Pago';
import Venta from '../models/Venta';

const ObjectId = mongoose.Types.ObjectId;

export const getPagos = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Pago.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Pagos', error });
    }
};

export const getPagoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const pago = await Pago.findById(id);

        if (!pago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        const venta = await Venta.findById(pago.venta_id);
        res.json({
            pago,
            venta: venta
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Pago', error });
    }
};

export const savePago = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Pago.insertMany(req.body);
            return res.status(201).json({ message: 'Pagos creados', data: items });
        }

        const { venta_id, medio_pago, cuota, monto, estado, fecha_pago, fecha_vencimiento } = req.body;

        if (!req.body.venta_id || !req.body.cuota || !req.body.monto || !req.body.estado || !req.body.fecha_pago) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Pago({ venta_id,medio_pago, cuota, monto, estado, fecha_pago, fecha_vencimiento });
        await newItem.save();

        res.status(201).json({ message: 'Pago creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Pago', error });
    }
};

export const listPagos = async (req: Request, res: Response) => {
    try {
      await conBD();
      const pagos = await Pago.find();
      res.json(pagos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Pagos', error: error.message });
    }
  };

export const updatePago = async (req: Request, res: Response) => {
    try {
        const pagoId = req.params.id.trim();
        await conBD();
        const { venta_id,medio_pago, cuota, monto, estado, fecha_pago, fecha_vencimiento } = req.body;

        if (!req.body.venta_id || !req.body.cuota || !req.body.monto || !req.body.estado || !req.body.fecha_pago) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(pagoId);
        const updatedPago = await Pago.findByIdAndUpdate(objectId, {
            venta_id,medio_pago, cuota, monto, estado, fecha_pago, fecha_vencimiento
        }, { new: true });

        if (!updatedPago) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.status(200).json({ message: 'Pago actualizado correctamente', data: updatedPago });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Pago', error });
    }
};

export const deletePago = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Pago.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.json({ message: 'Pago eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Pago', error });
    }
};