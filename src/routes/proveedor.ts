import express, { Router } from 'express';
  import { getProveedors,getProveedorById,saveProveedor,updateProveedor,deleteProveedor,listProveedors} from '../controllers/proveedorControllers';
  
  const router: Router = express.Router();
  
  router.get("/proveedors/", getProveedors);
  router.post("/proveedors/list/", listProveedors);
  router.get("/proveedors/:id", getProveedorById); 
  router.post("/proveedors/create", saveProveedor);
  router.put("/proveedors/update/:id", updateProveedor);
  router.delete("/proveedors/delete/:id", deleteProveedor);
export default router;