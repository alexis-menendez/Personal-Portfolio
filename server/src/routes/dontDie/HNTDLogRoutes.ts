// File: server/src/routes/dontDie/HNTDLogRoutes.ts

import { Router, Request, Response } from 'express';
import { HNTDLog } from '../../models/dontDie/index.js';
import { verifyHNTDToken } from '../../middleware/HNTDAuth.js';

const router = Router();

router.use(verifyHNTDToken);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const logs = await HNTDLog.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    res.json(logs);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { title, content, commanderName } = req.body;
  if (!title || !content) { res.status(400).json({ message: 'Title and content required' }); return; }
  try {
    const userId = (req.user as any).userId;
    const log = await HNTDLog.create({ userId, title, content, commanderName });
    res.status(201).json(log);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;
  try {
    const userId = (req.user as any).userId;
    const log = await HNTDLog.findOne({ where: { id: req.params.id, userId } });
    if (!log) { res.status(404).json({ message: 'Log not found' }); return; }
    await log.update({ title, content });
    res.json(log);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const log = await HNTDLog.findOne({ where: { id: req.params.id, userId } });
    if (!log) { res.status(404).json({ message: 'Log not found' }); return; }
    await log.destroy();
    res.json({ message: 'Deleted' });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

export default router;
