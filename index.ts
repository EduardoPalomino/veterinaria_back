import express, { Express,Router} from 'express';
import dotenv from 'dotenv';

import rolRouter from './src/routes/rol';
import usuarioRouter from './src/routes/usuario';
import clienteRouter from './src/routes/cliente';
import especieRouter from './src/routes/especie';
import razaRouter from './src/routes/raza';
import mascotaRouter from './src/routes/mascota';
import sexoRouter from './src/routes/sexo';
import proveedorRouter from './src/routes/proveedor';
import Categoria_ProductoRouter from './src/routes/categoria_producto';
import productoRouter from './src/routes/producto';
import compraRouter from './src/routes/compra';
import Detalle_CompraRouter from './src/routes/detalle_compra';
import ventaRouter from './src/routes/venta';
import Detalle_VentaRouter from './src/routes/detalle_venta';
import Historia_ClinicaRouter from './src/routes/historia_clinica';
import reporteRouter from './src/routes/reporte';

import {connectToDatabase} from './src/config/try_conexion';

import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();
const app: Express = express();
// Habilitar CORS
// set response headers
app.use((request, response, next)=>{
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  response.header('Access-Control-Expose-Headers', 'Content-Disposition');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(200);
  }

  return next();
})

// Analizar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Analizar application/json
app.use(bodyParser.json());





//const {API_PORT} = process.env;
const API_PORT = process.env.PORT || process.env.API_PORT || 3009;

app.use(express.json());
app.use('/', rolRouter);
app.use('/', usuarioRouter);
app.use('/', clienteRouter);
app.use('/', especieRouter);
app.use('/', razaRouter);
app.use('/', mascotaRouter);
app.use('/', sexoRouter);
app.use('/', proveedorRouter);
app.use('/', Categoria_ProductoRouter);
app.use('/', productoRouter);
app.use('/', compraRouter);
app.use('/', Detalle_CompraRouter);
app.use('/', ventaRouter);
app.use('/', Detalle_VentaRouter);
app.use('/', Historia_ClinicaRouter);
app.use('/', reporteRouter);

//app.use('api/utils/file', utilsRouter);
app.use("/uploads", express.static("./dist/src/routes/uploads"))
//const dbUri: string = `mongodb://${DB_DOMAIN}:${DB_PORT}/${DB}`;

connectToDatabase(); //call BD

const server = app.listen(API_PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${API_PORT}`);
});
export default server;

