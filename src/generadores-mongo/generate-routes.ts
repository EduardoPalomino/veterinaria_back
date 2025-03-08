import fs from 'fs';
import path from 'path';

const FileName = process.argv[2];
const ModelFileName = `${FileName.charAt(0).toUpperCase() + FileName.slice(1)}`;
const fields = process.argv.slice(3); // Captura los campos pasados como argumentos
if (!FileName) {
  console.error('Por favor, proporciona el nombre del archivo de migración como argumento.');
  process.exit(1);
}
const newFileName = `${FileName}.ts`;
const migrationsDir = path.join(__dirname, '..', '', 'routes');
const migrationFile = path.join(migrationsDir, newFileName);
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}
const processedContent = writeContent(FileName, fields); // Pasa los campos como parámetros a la función writeContent
fs.writeFileSync(migrationFile, processedContent);
console.log(`Nuevo archivo TypeScript generado exitosamente en '${migrationFile}'.`);

function writeContent(w: string, fields: string[]): string {
  w = w.charAt(0).toUpperCase() + w.slice(1);
  let content: string;
  let mfields=fields;   

  const importLoginUser = FileName === 'user' ? ',loginUser' : '';
  content = `import express, { Router } from 'express';
  import { get${ModelFileName}s,get${ModelFileName}ById,save${ModelFileName},update${ModelFileName},delete${ModelFileName},list${ModelFileName}s${importLoginUser}} from '../controllers/${FileName}Controllers';
  
  const router: Router = express.Router();
  ${FileName === 'user' ? 'router.post("/users/login", loginUser);' : ''}
  router.get("/${FileName}s/", get${ModelFileName}s);
  router.post("/${FileName}s/list/", list${ModelFileName}s);
  router.get("/${FileName}s/:id", get${ModelFileName}ById); 
  router.post("/${FileName}s/create", save${ModelFileName});
  router.put("/${FileName}s/update/:id", update${ModelFileName});
  router.delete("/${FileName}s/delete/:id", delete${ModelFileName});
export default router;`;

  return content;
}




