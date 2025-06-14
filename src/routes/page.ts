import express, { Router } from 'express';
  import { getPages,getPageById,savePage,updatePage,deletePage,listPages} from '../controllers/pageControllers';
  
  const router: Router = express.Router();
  
  router.get("/pages/", getPages);
  router.post("/pages/list/", listPages);
  router.get("/pages/:id", getPageById); 
  router.post("/pages/create", savePage);
  router.put("/pages/update/:id", updatePage);
  router.delete("/pages/delete/:id", deletePage);
export default router;