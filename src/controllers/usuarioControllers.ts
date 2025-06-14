import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';
import Usuario from '../models/Usuario';
import Rol from '../models/Rol';

const JWT_SECRET = process.env.JWT_SECRET || 'clave-secreta-elegante';
const ObjectId = mongoose.Types.ObjectId;

// Función de login (nueva)
export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        await conBD();
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Compara contraseñas con bcrypt (asegúrate de guardar passwords hasheadas)
        const isMatch = (password === usuario.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Genera un JWT elegante
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, rol_id: usuario.rol_id },
            JWT_SECRET,
            { expiresIn: '8h' } // Sesión de 8 horas
        );

        // Respuesta minimalista
        res.json({
            success: true,
            token,
            user: { nombre: usuario.nombre, email: usuario.email, rol_id: usuario.rol_id }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error});
    }
};

// Función para verificar token (opcional, útil para rutas protegidas)
export const verifyToken = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido o expirado' });
        }
        Object.assign(req, { user: decoded }); // Añade los datos del usuario al request
        next();
    });
};

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await Usuario.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Usuarios', error });
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const rol = await Rol.findById(usuario.rol_id);
        res.json({
            usuario,
            rol: rol
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener Usuario', error });
    }
};

export const saveUsuario = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await Usuario.insertMany(req.body);
            return res.status(201).json({ message: 'Usuarios creados', data: items });
        }

        const { nombre, apellido, email, password, rol_id } = req.body;

        if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.password || !req.body.rol_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new Usuario({ nombre, apellido, email, password, rol_id });
        await newItem.save();

        res.status(201).json({ message: 'Usuario creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar Usuario', error });
    }
};

export const listUsuarios = async (req: Request, res: Response) => {
    try {
      await conBD();
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving Usuarios', error: error.message });
    }
  };

export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.params.id.trim();
        await conBD();
        const { nombre, apellido, email, password, rol_id } = req.body;

        if (!req.body.nombre || !req.body.apellido || !req.body.email || !req.body.password || !req.body.rol_id) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(usuarioId);
        const updatedUsuario = await Usuario.findByIdAndUpdate(objectId, {
            nombre, apellido, email, password, rol_id
        }, { new: true });

        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado correctamente', data: updatedUsuario });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar Usuario', error });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await Usuario.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar Usuario', error });
    }
};