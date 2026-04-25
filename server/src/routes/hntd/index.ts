// File: server/src/routes/hntd/index.ts

import { Router } from 'express';
import authRoutes from './authRoutes.js';

const router = Router();
router.use('/auth', authRoutes);

export default router;
