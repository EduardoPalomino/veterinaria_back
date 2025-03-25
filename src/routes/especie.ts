import express, { Router } from 'express';
  import { getEspecies,getEspecieById,saveEspecie,updateEspecie,deleteEspecie,listEspecies} from '../controllers/especieControllers';
  
  const router: Router = express.Router();
  
  router.get("/especies/", getEspecies);
  router.post("/especies/list/", listEspecies);
  router.get("/especies/:id", getEspecieById); 
  router.post("/especies/create", saveEspecie);
  router.put("/especies/update/:id", updateEspecie);
  router.delete("/especies/delete/:id", deleteEspecie);
export default router;