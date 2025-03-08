import express, { Router } from 'express';
  import { getRols,getRolById,saveRol,updateRol,deleteRol,listRols} from '../controllers/rolControllers';
  
  const router: Router = express.Router();
  
  router.get("/rols/", getRols);
  router.post("/rols/list/", listRols);
  router.get("/rols/:id", getRolById); 
  router.post("/rols/create", saveRol);
  router.put("/rols/update/:id", updateRol);
  router.delete("/rols/delete/:id", deleteRol);
export default router;