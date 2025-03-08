import express, { Router } from 'express';
  import { getDetalle_compras,getDetalle_compraById,saveDetalle_compra,updateDetalle_compra,deleteDetalle_compra,listDetalle_compras} from '../controllers/detalle_compraControllers';
  
  const router: Router = express.Router();
  
  router.get("/detalle_compras/", getDetalle_compras);
  router.post("/detalle_compras/list/", listDetalle_compras);
  router.get("/detalle_compras/:id", getDetalle_compraById); 
  router.post("/detalle_compras/create", saveDetalle_compra);
  router.put("/detalle_compras/update/:id", updateDetalle_compra);
  router.delete("/detalle_compras/delete/:id", deleteDetalle_compra);
export default router;