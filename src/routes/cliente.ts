import express, { Router } from 'express';
  import { getClientes,getClienteById,saveCliente,updateCliente,deleteCliente,listClientes} from '../controllers/clienteControllers';
  
  const router: Router = express.Router();
  
  router.get("/clientes/", getClientes);
  router.post("/clientes/list/", listClientes);
  router.get("/clientes/:id", getClienteById); 
  router.post("/clientes/create", saveCliente);
  router.put("/clientes/update/:id", updateCliente);
  router.delete("/clientes/delete/:id", deleteCliente);
export default router;