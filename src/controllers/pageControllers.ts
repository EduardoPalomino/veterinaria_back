import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Page from '../models/Page';


const ObjectId = mongoose.Types.ObjectId;

export const getPages = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Page.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Pages', error });
    }
};

export const getPageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const page = await Page.findById(id);

        if (!page) {
            return res.status(404).json({ message: 'Page no encontrado' });
        }

        
        res.json({
            page,
            
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Page', error });
    }
};

export const savePage = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Page.insertMany(req.body);
            return res.status(201).json({ message: 'Pages creados', data: items });
        }

        const { order, ruta, nombre, descripcion, icon } = req.body;

        if (!req.body.order || !req.body.ruta || !req.body.nombre || !req.body.descripcion || !req.body.icon) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Page({ order, ruta, nombre, descripcion, icon });
        await newItem.save();

        res.status(201).json({ message: 'Page creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Page', error });
    }
};

export const listPages = async (req: Request, res: Response) => {
    try {
      await conBD();
      const pages = await Page.find();
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Pages', error: error.message });
    }
  };

export const updatePage = async (req: Request, res: Response) => {
    try {
        const pageId = req.params.id.trim();
        await conBD();
        const { order, ruta, nombre, descripcion, icon } = req.body;

        if (!req.body.order || !req.body.ruta || !req.body.nombre || !req.body.descripcion || !req.body.icon) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(pageId);
        const updatedPage = await Page.findByIdAndUpdate(objectId, {
            order, ruta, nombre, descripcion, icon
        }, { new: true });

        if (!updatedPage) {
            return res.status(404).json({ message: 'Page no encontrado' });
        }

        res.status(200).json({ message: 'Page actualizado correctamente', data: updatedPage });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Page', error });
    }
};

export const deletePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Page.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Page no encontrado' });
        }

        res.json({ message: 'Page eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Page', error });
    }
};