// File: server/src/routes/dontDie/index.ts

import { Router } from 'express';
import authRoutes     from './HNTDAuthRoutes.js';
import logRoutes      from './HNTDLogRoutes.js';
import survivalRoutes from './HNTDSurvivalRoutes.js';

const router = Router();
router.use('/auth',         authRoutes);
router.use('/api/logs',     logRoutes);
router.use('/api/survival', survivalRoutes);

export default router;
