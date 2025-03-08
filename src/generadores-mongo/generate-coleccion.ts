import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Configurar dotenv
dotenv.config();

// Capturar el parámetro de entrada (nombre del archivo)
const args = process.argv.slice(2);
const FileName = args[0];

if (!FileName) {
    console.error('Por favor, proporciona el nombre del archivo como primer argumento.');
    process.exit(1);
}

// Función para obtener las columnas, excluyendo las de tipo 'Date' y las específicas
function getColumnsExcludingFields(fileName: string): string[] {
    const filePath = path.join(__dirname, '..', 'models', `${fileName}.ts`);

    try {
        // Importar el modelo (y su esquema)
        const model = require(filePath).default;
        const schema = model.schema; // Acceder al esquema del modelo

        // Filtrar las propiedades que no sean 'Date' y las columnas específicas a excluir
        const columns = Object.keys(schema.obj).filter((key) => {
            const type = schema.obj[key];
            return type !== Date && !['created_at', 'updated_at', '__v', 'refresh_token'].includes(key);
        });

        return columns;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error al obtener las columnas de ${fileName}: ${error.message}`);
        } else {
            console.error('Error desconocido al obtener las columnas.');
        }
        return [];
    }
}

// Obtener las columnas excluyendo las de tipo 'Date' y las columnas específicas
const columns = getColumnsExcludingFields(FileName);

// Crear el directorio 'postman_collections' si no existe
const outputDir = path.join(__dirname, '..', 'postman_collections');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Formatear el contenido para que sea: 'User:name,username,password,role,rol_id'
const formattedContent = `${FileName}:${columns.join(',')}\n`; // Agregar salto de línea al final

// Crear un archivo .txt llamado 'collection.txt' en '../postman_collections' y escribir el contenido
const outputFilePath = path.join(outputDir, 'collection.txt');

// Usar 'a' para append y agregar en la siguiente línea sin sobrescribir
fs.appendFileSync(outputFilePath, formattedContent, 'utf-8');
console.log(`Las columnas han sido añadidas a '${outputFilePath}'.`);
