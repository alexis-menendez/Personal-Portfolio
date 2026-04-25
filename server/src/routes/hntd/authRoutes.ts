// File: server/src/routes/hntd/authRoutes.ts

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { HNTDUser } from '../../models/hntd/index.js';
import { generateHNTDToken } from '../../middleware/hntdAuth.js';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required' }); return;
  }
  try {
    const existing = await HNTDUser.findOne({ where: { username } });
    if (existing) { res.status(409).json({ message: 'Username already taken' }); return; }

    const user = await HNTDUser.create({ username, password });
    const token = generateHNTDToken(user.id, user.username);
    res.status(201).json({ token, user: { id: user.id, username: user.username } });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await HNTDUser.findOne({ where: { username } });
  if (!user) { res.status(401).json({ message: 'Authentication failed' }); return; }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { res.status(401).json({ message: 'Authentication failed' }); return; }

  const token = generateHNTDToken(user.id, user.username);
  res.json({ token, user: { id: user.id, username: user.username } });
});

export default router;
