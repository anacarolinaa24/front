import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Rotas públicas
router.post("/login", UsuarioController.login);
router.post("/registro", UsuarioController.registro);

// Middleware de autenticação
router.use(authMiddleware);

// Linha 16 - PROBLEMA AQUI: getPerfil é undefined
router.get("/perfil", UsuarioController.getPerfil);
router.put("/perfil", UsuarioController.updatePerfil);

export default router;
