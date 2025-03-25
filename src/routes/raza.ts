import express, { Router } from 'express';
  import { getRazas,getRazaById,saveRaza,updateRaza,deleteRaza,listRazas} from '../controllers/razaControllers';
  
  const router: Router = express.Router();
  
  router.get("/razas/", getRazas);
  router.post("/razas/list/", listRazas);
  router.get("/razas/:id", getRazaById); 
  router.post("/razas/create", saveRaza);
  router.put("/razas/update/:id", updateRaza);
  router.delete("/razas/delete/:id", deleteRaza);
export default router;