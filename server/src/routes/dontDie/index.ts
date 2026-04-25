// File: server/src/routes/dontDie/index.ts

import { Router } from 'express';
import authRoutes from './HNTDAuthRoutes.js';
import logRoutes  from './HNTDLogRoutes.js';

const router = Router();
router.use('/auth', authRoutes);
router.use('/api/logs', logRoutes);

export default router;
