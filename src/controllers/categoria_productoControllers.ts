import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Categoria_producto from '../models/Categoria_producto';


const ObjectId = mongoose.Types.ObjectId;

export const getCategoria_productos = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Categoria_producto.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Categoria_productos', error });
    }
};

export const getCategoria_productoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const categoria_producto = await Categoria_producto.findById(id);

        if (!categoria_producto) {
            return res.status(404).json({ message: 'Categoria_producto no encontrado' });
        }

        
        res.json({
            categoria_producto,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Categoria_producto', error });
    }
};

export const saveCategoria_producto = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Categoria_producto.insertMany(req.body);
            return res.status(201).json({ message: 'Categoria_productos creados', data: items });
        }

        const { nombre, descripcion } = req.body;

        if (!req.body.nombre || !req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Categoria_producto({ nombre, descripcion });
        await newItem.save();

        res.status(201).json({ message: 'Categoria_producto creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Categoria_producto', error });
    }
};

export const listCategoria_productos = async (req: Request, res: Response) => {
    try {
      await conBD();
      const categoria_productos = await Categoria_producto.find();
      res.json(categoria_productos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Categoria_productos', error: error.message });
    }
  };

export const updateCategoria_producto = async (req: Request, res: Response) => {
    try {
        const categoria_productoId = req.params.id.trim();
        await conBD();
        const { nombre, descripcion } = req.body;

        if (!req.body.nombre || !req.body.descripcion) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(categoria_productoId);
        const updatedCategoria_producto = await Categoria_producto.findByIdAndUpdate(objectId, {
            nombre, descripcion
        }, { new: true });

        if (!updatedCategoria_producto) {
            return res.status(404).json({ message: 'Categoria_producto no encontrado' });
        }

        res.status(200).json({ message: 'Categoria_producto actualizado correctamente', data: updatedCategoria_producto });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Categoria_producto', error });
    }
};

export const deleteCategoria_producto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Categoria_producto.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Categoria_producto no encontrado' });
        }

        res.json({ message: 'Categoria_producto eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Categoria_producto', error });
    }
};