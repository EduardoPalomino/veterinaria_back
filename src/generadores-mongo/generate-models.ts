import fs from 'fs';
import path from 'path';
// codigo mejorado 2025 modelos
// Leer argumentos CLI
const modelName = process.argv[2]; // Ej: usuario
let fieldsInput = process.argv.slice(3).join(' '); // Captura todo lo que viene después del nombre del modelo

// Mostrar en consola para depurar
console.log('📥 Valor original recibido en fieldsInput:', fieldsInput);

// Normalizar: si está separado por espacios en vez de comas, lo corregimos
if (!fieldsInput.includes(',')) {
    fieldsInput = fieldsInput.split(/\s+/).join(','); // Reemplaza espacios múltiples por coma
    console.log('⚠️ Corregido a formato CSV:', fieldsInput);
}

if (!modelName || !fieldsInput) {
    console.error('❌ Debes proporcionar el nombre del modelo y los campos.');
    process.exit(1);
}

// Convertir campos en array
const fields = fieldsInput.split(',').map(field => field.trim());
console.log('✅ Array final de campos:', fields);

// Capitalizar el nombre del modelo para el nombre del archivo
const ModelFileName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

// Ruta de salida
const modelsDir = path.join(__dirname, '..', 'models');
const modelFilePath = path.join(modelsDir, `${ModelFileName}.ts`);

if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
}

// Generar el contenido del modelo
const schemaContent = generateSchema(modelName, ModelFileName, fields);

// Escribir el archivo
fs.writeFileSync(modelFilePath, schemaContent);
console.log(`✅ Modelo '${modelName}' generado correctamente en '${modelFilePath}'`);

// ----------------------
// Función para generar el schema correctamente
function generateSchema(modelName: string, modelFileName: string, fields: string[]): string {
    const schemaFields = fields.map(field => {
        if (field.endsWith('_id')) {
            const refName = field.replace('_id', '');
            return `  ${field}: { type: mongoose.Schema.Types.ObjectId, ref: '${refName}' },`;
        } else {
            return `  ${field}: String,`;
        }
    }).join('\n');

    return `
import mongoose from 'mongoose';

const ${modelFileName}Schema = new mongoose.Schema({
${schemaFields}
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  __v: Number,
  refresh_token: String
});

export default mongoose.model('${modelName}', ${modelFileName}Schema);
    `.trim();
}
