import express, { Router } from 'express';
  import { getProductos,getProductoById,saveProducto,updateProducto,deleteProducto,listProductos} from '../controllers/productoControllers';
  
  const router: Router = express.Router();
  
  router.get("/productos/", getProductos);
  router.post("/productos/list/", listProductos);
  router.get("/productos/:id", getProductoById); 
  router.post("/productos/create", saveProducto);
  router.put("/productos/update/:id", updateProducto);
  router.delete("/productos/delete/:id", deleteProducto);
export default router;