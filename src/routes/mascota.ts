import express, { Router } from 'express';
  import { getMascotas,getMascotaById,saveMascota,updateMascota,deleteMascota,listMascotas} from '../controllers/mascotaControllers';
  
  const router: Router = express.Router();
  
  router.get("/mascotas/", getMascotas);
  router.post("/mascotas/list/", listMascotas);
  router.get("/mascotas/:id", getMascotaById); 
  router.post("/mascotas/create", saveMascota);
  router.put("/mascotas/update/:id", updateMascota);
  router.delete("/mascotas/delete/:id", deleteMascota);
export default router;