import express, { Router } from 'express';
  import { getDetalle_ventas,getDetalle_ventaById,saveDetalle_venta,updateDetalle_venta,deleteDetalle_venta,listDetalle_ventas} from '../controllers/detalle_ventaControllers';
  
  const router: Router = express.Router();
  
  router.get("/detalle_ventas/", getDetalle_ventas);
  router.post("/detalle_ventas/list/", listDetalle_ventas);
  router.get("/detalle_ventas/:id", getDetalle_ventaById); 
  router.post("/detalle_ventas/create", saveDetalle_venta);
  router.put("/detalle_ventas/update/:id", updateDetalle_venta);
  router.delete("/detalle_ventas/delete/:id", deleteDetalle_venta);
export default router;