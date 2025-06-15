import { Router } from "express";
import usuarioRoutes from "./usuario.routes";
import alimentoRoutes from "./alimento.routes";
import refeicaoRoutes from "./refeicao.routes";
import dietaRoutes from "./dieta.routes";

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/alimentos", alimentoRoutes);
router.use("/refeicoes", refeicaoRoutes);
router.use("/dietas", dietaRoutes);

export default router;
