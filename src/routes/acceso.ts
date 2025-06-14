import express, { Router } from 'express';
  import { getAccesos,getAccesoById,saveAcceso,updateAcceso,deleteAcceso,listAccesos} from '../controllers/accesoControllers';
  
  const router: Router = express.Router();
  
  router.get("/accesos/", getAccesos);
  router.post("/accesos/list/", listAccesos);
  router.get("/accesos/:id", getAccesoById); 
  router.post("/accesos/create", saveAcceso);
  router.put("/accesos/update/:id", updateAcceso);
  router.delete("/accesos/delete/:id", deleteAcceso);
export default router;