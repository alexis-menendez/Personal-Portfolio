// File: server/src/routes/taskadelic/authRoutes.ts

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TDUser } from '../../models/taskadelic/index.js';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await TDUser.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Authentication failed' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Authentication failed' });

  const secret = process.env.TD_JWT_SECRET || process.env.JWT_SECRET_KEY || '';
  const token  = jwt.sign({ username }, secret, { expiresIn: '1h' });
  return res.json({ token });
});

export default router;
