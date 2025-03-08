import express, { Router } from 'express';
  import { getUsuarios,getUsuarioById,saveUsuario,updateUsuario,deleteUsuario,listUsuarios} from '../controllers/usuarioControllers';
  
  const router: Router = express.Router();
  
  router.get("/usuarios/", getUsuarios);
  router.post("/usuarios/list/", listUsuarios);
  router.get("/usuarios/:id", getUsuarioById); 
  router.post("/usuarios/create", saveUsuario);
  router.put("/usuarios/update/:id", updateUsuario);
  router.delete("/usuarios/delete/:id", deleteUsuario);
export default router;