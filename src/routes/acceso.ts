import express, { Router } from 'express';
  import {
  getAccesos,
  getAccesoById,
  saveAcceso,
  updateAcceso,
  deleteAcceso,
  listAccesos,
    getAccesoByRolId
  } from '../controllers/accesoControllers';
  
  const router: Router = express.Router();
  
  router.get("/accesos/", getAccesos);
  router.post("/accesos/list/", listAccesos);
  router.get("/accesos/:id", getAccesoById);
  router.get("/accesos/rol/:id", getAccesoByRolId);
  router.post("/accesos/create", saveAcceso);
  router.put("/accesos/update/:id", updateAcceso);
  router.delete("/accesos/delete/:id", deleteAcceso);
export default router;