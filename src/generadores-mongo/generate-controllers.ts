import fs from 'fs';
import path from 'path';
//modificacion 2025
// Obtener nombre de archivo (modelo) y campos desde argumentos
const fileName = process.argv[2];
// Aquí hacemos el fix
const fields = process.argv.slice(3).join(' ').split(/[, ]+/);

if (!fileName) {
    console.error('⚠️ Debes proporcionar el nombre del archivo (modelo) como primer argumento.');
    process.exit(1);
}

const modelName = capitalize(fileName);
const controllerFileName = `${fileName}Controllers.ts`;

// Definir ruta destino
const controllersDir = path.join(__dirname, '..', 'controllers');
const controllerFilePath = path.join(controllersDir, controllerFileName);

// Crear carpeta controllers si no existe
if (!fs.existsSync(controllersDir)) {
    fs.mkdirSync(controllersDir, { recursive: true });
}

// Generar el contenido y guardar el archivo
const content = generateControllerContent(fileName, fields);
fs.writeFileSync(controllerFilePath, content);
console.log(`✅ Controlador generado: ${controllerFilePath}`);

// ----------------- Función generadora -----------------
function generateControllerContent(model: string, fields: string[]): string {
    const ModelName = capitalize(model);
    const relatedModels = fields.filter(f => f.endsWith('_id')).map(f => f.replace('_id', ''));
    const hasRelations = relatedModels.length > 0;

    const relationImports = relatedModels.map(rel =>
        `import ${capitalize(rel)} from '../models/${capitalize(rel)}';`
    ).join('\n');

    const relationQueries = relatedModels.map(rel =>
        `const ${rel} = await ${capitalize(rel)}.findById(${model}.${rel}_id);`
    ).join('\n        ');

    const relationResponse = relatedModels.map(rel =>
        `${rel}: ${rel}`
    ).join(',\n            ');

    const requiredChecks = fields.map(f => `!req.body.${f}`).join(' || ');

    const bcryptImport = (model === 'user') ? `import bcrypt from 'bcrypt';` : '';
    const loginFunction = (model === 'user') ? generateLoginFunction() : '';

    const formattedFields = fields.join(', ');
    const fieldChecks = fields.map(f => `!${f}`).join(' || ');

    return `
import { Request, Response } from 'express';
import conBD from '../config/conexion';
import mongoose from 'mongoose';
${bcryptImport}
import ${ModelName} from '../models/${ModelName}';
${hasRelations ? relationImports : ''}

const ObjectId = mongoose.Types.ObjectId;

export const get${ModelName}s = async (req: Request, res: Response) => {
    try {
        await conBD();
        const data = await ${ModelName}.find();
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener ${ModelName}s', error });
    }
};

export const get${ModelName}ById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await conBD();
        const ${model} = await ${ModelName}.findById(id);

        if (!${model}) {
            return res.status(404).json({ message: '${ModelName} no encontrado' });
        }

        ${hasRelations ? relationQueries : ''}
        res.json({
            ${model},
            ${hasRelations ? relationResponse : ''}
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al obtener ${ModelName}', error });
    }
};

export const save${ModelName} = async (req: Request, res: Response) => {
    try {
        await conBD();

        if (Array.isArray(req.body)) {
            const items = await ${ModelName}.insertMany(req.body);
            return res.status(201).json({ message: '${ModelName}s creados', data: items });
        }

        const { ${formattedFields} } = req.body;

        if (${requiredChecks}) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const newItem = new ${ModelName}({ ${formattedFields} });
        await newItem.save();

        res.status(201).json({ message: '${ModelName} creado', data: newItem });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al guardar ${ModelName}', error });
    }
};

export const list${ModelName}s = async (req: Request, res: Response) => {
    try {
      await conBD();
      const ${fileName}s = await ${ModelName}.find();
      res.json(${fileName}s);
    } catch (error: any) {
      res.status(500).json({ message: 'Error retrieving ${ModelName}s', error: error.message });
    }
  };

export const update${ModelName} = async (req: Request, res: Response) => {
    try {
        const ${model}Id = req.params.id.trim();
        await conBD();
        const { ${formattedFields} } = req.body;

        if (${requiredChecks}) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const objectId = new ObjectId(${model}Id);
        const updated${ModelName} = await ${ModelName}.findByIdAndUpdate(objectId, {
            ${formattedFields}
        }, { new: true });

        if (!updated${ModelName}) {
            return res.status(404).json({ message: '${ModelName} no encontrado' });
        }

        res.status(200).json({ message: '${ModelName} actualizado correctamente', data: updated${ModelName} });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al actualizar ${ModelName}', error });
    }
};

export const delete${ModelName} = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await conBD();
        const deleted = await ${ModelName}.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: '${ModelName} no encontrado' });
        }

        res.json({ message: '${ModelName} eliminado' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al eliminar ${ModelName}', error });
    }
};

${loginFunction}
`.trim();
}

// ----------------- Función login para usuarios -----------------
function generateLoginFunction(): string {
    return `
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        await conBD();
        const user = await User.findOne({ username });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        res.json({ message: 'Login exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};
    `.trim();
}

// ----------------- Función para capitalizar -----------------
function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
