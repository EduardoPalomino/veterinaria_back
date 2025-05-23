import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';

import Producto from '../models/Producto';
import Categoria_producto from '../models/Categoria_producto';
import Proveedor from '../models/Proveedor';

const ObjectId = mongoose.Types.ObjectId;

export const getProductos = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Producto.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Productos', error });
    }
};

export const getProductoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const categoria_producto = await Categoria_producto.findById(producto.categoria_producto_id);
        const proveedor = await Proveedor.findById(producto.proveedor_id);
        res.json({
            producto,
            categoria_producto: categoria_producto,
            proveedor: proveedor
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Producto', error });
    }
};

export const saveProducto = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Producto.insertMany(req.body);
            return res.status(201).json({ message: 'Productos creados', data: items });
        }

        const { nombre,foto, categoria_producto_id, tamano, precio_venta, stock, descripcion, proveedor_id } = req.body;

        if (!req.body.nombre || !req.body.categoria_producto_id || !req.body.tamano || !req.body.precio_venta || !req.body.stock || !req.body.descripcion || !req.body.proveedor_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Producto({ nombre,foto, categoria_producto_id, tamano, precio_venta, stock, descripcion, proveedor_id });
        await newItem.save();

        res.status(201).json({ message: 'Producto creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Producto', error });
    }
};

export const listProductos = async (req: Request, res: Response) => {
    try {
      await conBD();
      const productos = await Producto.find();
      res.json(productos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Productos', error: error.message });
    }
  };

export const updateProducto = async (req: Request, res: Response) => {
    try {
        const productoId = req.params.id.trim();
        await conBD();
        const { nombre,foto, categoria_producto_id, tamano, precio_venta, stock, descripcion, proveedor_id } = req.body;

        if (!req.body.nombre || !req.body.categoria_producto_id || !req.body.tamano || !req.body.precio_venta || !req.body.stock || !req.body.descripcion || !req.body.proveedor_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(productoId);
        const updatedProducto = await Producto.findByIdAndUpdate(objectId, {
            nombre,foto, categoria_producto_id, tamano, precio_venta, stock, descripcion, proveedor_id
        }, { new: true });

        if (!updatedProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', data: updatedProducto });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Producto', error });
    }
};

export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Producto.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Producto', error });
    }
};