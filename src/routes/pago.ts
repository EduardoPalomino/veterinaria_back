import express, { Router } from 'express';
  import { getPagos,getPagoById,savePago,updatePago,deletePago,listPagos} from '../controllers/pagoControllers';
  
  const router: Router = express.Router();
  
  router.get("/pagos/", getPagos);
  router.post("/pagos/list/", listPagos);
  router.get("/pagos/:id", getPagoById); 
  router.post("/pagos/create", savePago);
  router.put("/pagos/update/:id", updatePago);
  router.delete("/pagos/delete/:id", deletePago);
export default router;