import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Leer el archivo collection.txt
const txtFilePath = path.join(__dirname, '..', 'postman_collections', 'collection.txt');
const fileContent = fs.readFileSync(txtFilePath, 'utf-8').trim().split('\n');
const dbName = process.env.DB || 'Dynamic Collection';
// Definir la ruta donde se guardará la colección Postman
const baseUrl = process.env.BASE_URL_API || 'http://localhost:3009'; // URL base de tu API
const postmanDir = path.join(__dirname, '..', 'postman_collections');
const collectionFile = path.join(postmanDir, 'generated_collection.json');

// Generar la colección de Postman
const collection = generatePostmanCollection(fileContent, baseUrl);

if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir, { recursive: true });
}

fs.writeFileSync(collectionFile, JSON.stringify(collection, null, 2));
console.log(`Colección Postman generada exitosamente en '${collectionFile}'.`);

// Definir tipos para la colección y los ítems
interface PostmanRequest {
  method: string;
  url: {
    raw: string;
    protocol: string;
    host: string[];
    path: string[];
  };
  body?: {
    mode: string;
    raw: string;
  };
}

interface PostmanItem {
  name: string;
  request?: PostmanRequest; // El request es opcional para permitir carpetas sin request
  response?: any[];
  item?: PostmanItem[]; // Subitems para permitir carpetas con endpoints
}

interface PostmanCollection {
  info: {
    name: string;
    description: string;
    schema: string;
  };
  item: PostmanItem[];
}

// Función para generar la colección de Postman
function generatePostmanCollection(fileContent: string[], baseUrl: string): PostmanCollection {
  const collection: PostmanCollection = {
    info: {
      name: dbName,
      description: 'Postman collection with dynamic folders and endpoints based on file content.',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: [],
  };

  // Procesar las líneas y generar carpetas con sus endpoints
  fileContent.forEach((line) => {
    const [folderName, fieldsStr] = line.split(':');
    const fields = fieldsStr.split(',').map((field) => field.trim());

    // Crear la carpeta con sus endpoints
    const folder: PostmanItem = {
      name: folderName.trim(),
      item: generateEndpoints(folderName.trim(), fields, baseUrl),
    };

    // Añadir la carpeta a la colección
    collection.item.push(folder);
  });

  return collection;
}

// Función para generar los endpoints de una carpeta
function generateEndpoints(folderName: string, fields: string[], baseUrl: string): PostmanItem[] {
  return [
    {
      name: `Get ${folderName}s`,
      request: {
        method: 'GET',
        url: {
          raw: `${baseUrl}/${folderName}s/`,
          protocol: 'http',
          host: [baseUrl.replace('http://', '').replace('https://', '')],
          path: [`${folderName}s`],
        },
      },
      response: [],
    },
    {
      name: `Get ${folderName} by ID`,
      request: {
        method: 'GET',
        url: {
          raw: `${baseUrl}/${folderName}s/:id`,
          protocol: 'http',
          host: [baseUrl.replace('http://', '').replace('https://', '')],
          path: [`${folderName}s`, ':id'],
        },
      },
      response: [],
    },
    {
      name: `Create ${folderName}`,
      request: {
        method: 'POST',
        body: {
          mode: 'raw',
          raw: JSON.stringify(
              fields.reduce((acc, field) => {
                acc[field.trim()] = `{{${field.trim()}}}`;
                return acc;
              }, {})
          ),
        },
        url: {
          raw: `${baseUrl}/${folderName}s/create`,
          protocol: 'http',
          host: [baseUrl.replace('http://', '').replace('https://', '')],
          path: [`${folderName}s`, 'create'],
        },
      },
      response: [],
    },
    {
      name: `Update ${folderName}`,
      request: {
        method: 'PUT',
        body: {
          mode: 'raw',
          raw: JSON.stringify(
              fields.reduce((acc, field) => {
                acc[field.trim()] = `{{${field.trim()}}}`;
                return acc;
              }, {})
          ),
        },
        url: {
          raw: `${baseUrl}/${folderName}s/update/:id`,
          protocol: 'http',
          host: [baseUrl.replace('http://', '').replace('https://', '')],
          path: [`${folderName}s`, 'update'],
        },
      },
      response: [],
    },
    {
      name: `Delete ${folderName} by ID`,
      request: {
        method: 'DELETE',
        url: {
          raw: `${baseUrl}/${folderName}s/delete/:id`,
          protocol: 'http',
          host: [baseUrl.replace('http://', '').replace('https://', '')],
          path: [`${folderName}s`, 'delete', ':id'],
        },
      },
      response: [],
    },
  ];
}
