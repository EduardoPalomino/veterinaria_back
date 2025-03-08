import express, { Router } from 'express';
  import { getHistoria_clinicas,getHistoria_clinicaById,saveHistoria_clinica,updateHistoria_clinica,deleteHistoria_clinica,listHistoria_clinicas} from '../controllers/historia_clinicaControllers';
  
  const router: Router = express.Router();
  
  router.get("/historia_clinicas/", getHistoria_clinicas);
  router.post("/historia_clinicas/list/", listHistoria_clinicas);
  router.get("/historia_clinicas/:id", getHistoria_clinicaById); 
  router.post("/historia_clinicas/create", saveHistoria_clinica);
  router.put("/historia_clinicas/update/:id", updateHistoria_clinica);
  router.delete("/historia_clinicas/delete/:id", deleteHistoria_clinica);
export default router;