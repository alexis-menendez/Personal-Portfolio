// File: server/src/routes/dontDie/index.ts

import { Router } from 'express';
import authRoutes     from './HNTDAuthRoutes.js';
import logRoutes      from './HNTDLogRoutes.js';
import weatherRoutes  from './HNTDWeatherRoutes.js';
import feedbackRoutes from './HNTDFeedbackRoutes.js';

const router = Router();
router.use('/auth',         authRoutes);
router.use('/api/logs',     logRoutes);
router.use('/api/weather',  weatherRoutes);
router.use('/api/feedback', feedbackRoutes);

export default router;
