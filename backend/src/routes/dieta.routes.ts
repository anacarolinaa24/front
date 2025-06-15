import { Router } from 'express';
import { DietaController } from '../controllers/DietaController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Aplica middleware de autenticação
router.use(authMiddleware);

// Define as rotas com seus controllers
router.post('/', DietaController.create);
router.get('/', DietaController.getAll);

export default router;
