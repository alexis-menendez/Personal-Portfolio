// File: server/src/routes/taskadelic/index.ts

import { Router } from 'express';
import authRoutes   from './authRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import userRoutes   from './userRoutes.js';
import { authenticateTDToken } from '../../middleware/taskadelicAuth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api/tickets', authenticateTDToken, ticketRoutes);
router.use('/api/users',   authenticateTDToken, userRoutes);

export default router;
