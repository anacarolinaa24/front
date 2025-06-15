import { Router } from "express";
import { AlimentoController } from "../controllers/AlimentoController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Aplica middleware de autenticação
router.use(authMiddleware);

// Rotas de alimentos
router.get("/", AlimentoController.index);
router.post("/", AlimentoController.create);
router.get("/:id", AlimentoController.show);
router.put("/:id", AlimentoController.update);
router.delete("/:id", AlimentoController.delete);

export default router;
