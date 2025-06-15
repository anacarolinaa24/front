import { Router } from 'express';
import dietaRoutes from './dieta.routes';
import usuarioRoutes from './usuario.routes';
import alimentoRoutes from './alimento.routes';

const router = Router();

router.use('/dietas', dietaRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/alimentos', alimentoRoutes);

export default router;