import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Mascota from '../models/Mascota';
import Especie from '../models/Especie';
import Raza from '../models/Raza';
import Sexo from '../models/Sexo';
import Cliente from '../models/Cliente';

const ObjectId = mongoose.Types.ObjectId;

export const getMascotas = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Mascota.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Mascotas', error });
    }
};

export const getMascotaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const mascota = await Mascota.findById(id);

        if (!mascota) {
            return res.status(404).json({ message: 'Mascota no encontrado' });
        }

        const especie = await Especie.findById(mascota.especie_id);
        const raza = await Raza.findById(mascota.raza_id);
        const sexo = await Sexo.findById(mascota.sexo_id);
        const cliente = await Cliente.findById(mascota.cliente_id);
        res.json({
            mascota,
            especie: especie,
            raza: raza,
            sexo: sexo,
            cliente: cliente
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Mascota', error });
    }
};

export const saveMascota = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Mascota.insertMany(req.body);
            return res.status(201).json({ message: 'Mascotas creados', data: items });
        }

        const { nombre, especie_id, raza_id, fecha_nacimiento, peso, sexo_id, cliente_id } = req.body;

        if (!req.body.nombre || !req.body.especie_id || !req.body.raza_id || !req.body.fecha_nacimiento || !req.body.peso || !req.body.sexo_id || !req.body.cliente_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Mascota({ nombre, especie_id, raza_id, fecha_nacimiento, peso, sexo_id, cliente_id });
        await newItem.save();

        res.status(201).json({ message: 'Mascota creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Mascota', error });
    }
};

export const listMascotas = async (req: Request, res: Response) => {
    try {
      await conBD();
      const mascotas = await Mascota.find();
      res.json(mascotas);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Mascotas', error: error.message });
    }
  };

export const updateMascota = async (req: Request, res: Response) => {
    try {
        const mascotaId = req.params.id.trim();
        await conBD();
        const { nombre, especie_id, raza_id, fecha_nacimiento, peso, sexo_id, cliente_id } = req.body;

        if (!req.body.nombre || !req.body.especie_id || !req.body.raza_id || !req.body.fecha_nacimiento || !req.body.peso || !req.body.sexo_id || !req.body.cliente_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(mascotaId);
        const updatedMascota = await Mascota.findByIdAndUpdate(objectId, {
            nombre, especie_id, raza_id, fecha_nacimiento, peso, sexo_id, cliente_id
        }, { new: true });

        if (!updatedMascota) {
            return res.status(404).json({ message: 'Mascota no encontrado' });
        }

        res.status(200).json({ message: 'Mascota actualizado correctamente', data: updatedMascota });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Mascota', error });
    }
};

export const deleteMascota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Mascota.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Mascota no encontrado' });
        }

        res.json({ message: 'Mascota eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Mascota', error });
    }
};