// File: server/src/routes/dontDie/HNTDAuthRoutes.ts

import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { HNTDUser } from '../../models/dontDie/index.js';
import { generateHNTDToken, verifyHNTDToken } from '../../middleware/HNTDAuth.js';

const router = Router();

const userPayload = (user: InstanceType<typeof HNTDUser>) => ({
  id:            user.id,
  username:      user.username,
  characterName: user.characterName ?? user.username,
});

router.post('/register', async (req: Request, res: Response) => {
  const { username, password, characterName } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required' }); return;
  }
  try {
    const existing = await HNTDUser.findOne({ where: { username } });
    if (existing) { res.status(409).json({ message: 'Username already taken' }); return; }

    const user = await HNTDUser.create({
      username,
      password,
      characterName: characterName?.trim() || username,
    });
    const token = generateHNTDToken(user.id, user.username);
    res.status(201).json({ token, user: userPayload(user) });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await HNTDUser.findOne({ where: { username } });
  if (!user) { res.status(401).json({ message: 'Authentication failed' }); return; }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) { res.status(401).json({ message: 'Authentication failed' }); return; }

  const token = generateHNTDToken(user.id, user.username);
  res.json({ token, user: userPayload(user) });
});

// Updates characterName only — username and password never change
router.patch('/rename', verifyHNTDToken, async (req: Request, res: Response) => {
  const { characterName } = req.body;
  const userId = (req as any).user?.userId;
  if (!characterName || typeof characterName !== 'string' || !characterName.trim()) {
    res.status(400).json({ message: 'Character name required' }); return;
  }
  try {
    const user = await HNTDUser.findByPk(userId);
    if (!user) { res.status(404).json({ message: 'User not found' }); return; }
    await user.update({ characterName: characterName.trim() });
    const token = generateHNTDToken(user.id, user.username);
    res.json({ token, user: userPayload(user) });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

export default router;
