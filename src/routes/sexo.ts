import express, { Router } from 'express';
  import { getSexos,getSexoById,saveSexo,updateSexo,deleteSexo,listSexos} from '../controllers/sexoControllers';
  
  const router: Router = express.Router();
  
  router.get("/sexos/", getSexos);
  router.post("/sexos/list/", listSexos);
  router.get("/sexos/:id", getSexoById); 
  router.post("/sexos/create", saveSexo);
  router.put("/sexos/update/:id", updateSexo);
  router.delete("/sexos/delete/:id", deleteSexo);
export default router;