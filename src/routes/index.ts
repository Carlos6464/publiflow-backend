import { Router } from 'express';
import userRoutes from './userRoutes';
import postagemRoutes from './postagemRoutes';

const router = Router();

router.use(userRoutes);
router.use(postagemRoutes);

export default router;

