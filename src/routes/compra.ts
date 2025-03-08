import express, { Router } from 'express';
  import { getCompras,getCompraById,saveCompra,updateCompra,deleteCompra,listCompras} from '../controllers/compraControllers';
  
  const router: Router = express.Router();
  
  router.get("/compras/", getCompras);
  router.post("/compras/list/", listCompras);
  router.get("/compras/:id", getCompraById); 
  router.post("/compras/create", saveCompra);
  router.put("/compras/update/:id", updateCompra);
  router.delete("/compras/delete/:id", deleteCompra);
export default router;