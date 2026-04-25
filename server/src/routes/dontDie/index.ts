// File: server/src/routes/dontDie/index.ts

import { Router } from 'express';
import authRoutes from './HNTDAuthRoutes.js';

const router = Router();
router.use('/auth', authRoutes);

export default router;
