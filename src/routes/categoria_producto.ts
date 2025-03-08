import express, { Router } from 'express';
  import { getCategoria_productos,getCategoria_productoById,saveCategoria_producto,updateCategoria_producto,deleteCategoria_producto,listCategoria_productos} from '../controllers/categoria_productoControllers';
  
  const router: Router = express.Router();
  
  router.get("/categoria_productos/", getCategoria_productos);
  router.post("/categoria_productos/list/", listCategoria_productos);
  router.get("/categoria_productos/:id", getCategoria_productoById); 
  router.post("/categoria_productos/create", saveCategoria_producto);
  router.put("/categoria_productos/update/:id", updateCategoria_producto);
  router.delete("/categoria_productos/delete/:id", deleteCategoria_producto);
export default router;