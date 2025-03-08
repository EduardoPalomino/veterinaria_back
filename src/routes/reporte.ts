import express, { Router } from 'express';
  import { getReportes,getReporteById,saveReporte,updateReporte,deleteReporte,listReportes} from '../controllers/reporteControllers';
  
  const router: Router = express.Router();
  
  router.get("/reportes/", getReportes);
  router.post("/reportes/list/", listReportes);
  router.get("/reportes/:id", getReporteById); 
  router.post("/reportes/create", saveReporte);
  router.put("/reportes/update/:id", updateReporte);
  router.delete("/reportes/delete/:id", deleteReporte);
export default router;