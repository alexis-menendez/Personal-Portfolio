// File: server/src/routes/innerOrbit/libraryRoutes.ts

import { Router } from 'express';
import { getAllVideos } from '../controllers/libraryController.js';

const router = Router();

router.get('/videos', getAllVideos);

export default router;
