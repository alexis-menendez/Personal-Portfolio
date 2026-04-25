// File: server/src/routes/taskadelic/userRoutes.ts

import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from '../../controllers/taskadelic/userController.js';

const router = Router();

router.get('/',    getAllUsers);
router.get('/:id', getUserById);
router.post('/',   createUser);
router.delete('/:id', deleteUser);

export default router;
