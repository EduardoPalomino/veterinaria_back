import express, { Router } from 'express';
  import { getVentas,getVentaById,saveVenta,updateVenta,deleteVenta,listVentas} from '../controllers/ventaControllers';
  
  const router: Router = express.Router();
  
  router.get("/ventas/", getVentas);
  router.post("/ventas/list/", listVentas);
  router.get("/ventas/:id", getVentaById); 
  router.post("/ventas/create", saveVenta);
  router.put("/ventas/update/:id", updateVenta);
  router.delete("/ventas/delete/:id", deleteVenta);
export default router;