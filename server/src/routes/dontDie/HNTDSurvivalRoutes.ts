// File: server/src/routes/dontDie/HNTDSurvivalRoutes.ts

import { Router, Request, Response } from 'express';
import { HNTDSurvivalTip, HNTDVote } from '../../models/dontDie/index.js';
import { verifyHNTDToken } from '../../middleware/HNTDAuth.js';

const router = Router();

// GET tips — public, sorted by upvotes. Optional ?planet= filter.
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { planet } = req.query;
    const where = planet && typeof planet === 'string'
      ? { planet }
      : {};
    const tips = await HNTDSurvivalTip.findAll({ where, order: [['upvotes', 'DESC'], ['createdAt', 'DESC']] });
    res.json(tips);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

// POST new tip — authenticated. Optional planet in body.
router.post('/', verifyHNTDToken, async (req: Request, res: Response): Promise<void> => {
  const { title, content, planet } = req.body;
  if (!title || !content) { res.status(400).json({ message: 'Title and content required' }); return; }
  try {
    const userId   = (req.user as any).userId;
    const username = (req.user as any).username;
    const tip = await HNTDSurvivalTip.create({ userId, username, title, content, planet: planet ?? null });
    res.status(201).json(tip);
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

// POST toggle upvote — authenticated
router.post('/:id/vote', verifyHNTDToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const tipId  = Number(req.params.id);

    const tip = await HNTDSurvivalTip.findByPk(tipId);
    if (!tip) { res.status(404).json({ message: 'Tip not found' }); return; }

    const existing = await HNTDVote.findOne({ where: { tipId, userId } });
    if (existing) {
      await existing.destroy();
      tip.upvotes = Math.max(0, tip.upvotes - 1);
    } else {
      await HNTDVote.create({ tipId, userId });
      tip.upvotes = tip.upvotes + 1;
    }
    await tip.save();
    res.json({ upvotes: tip.upvotes, voted: !existing });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

// DELETE own tip — authenticated
router.delete('/:id', verifyHNTDToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req.user as any).userId;
    const tip    = await HNTDSurvivalTip.findOne({ where: { id: req.params.id, userId } });
    if (!tip) { res.status(404).json({ message: 'Not found or not yours' }); return; }
    await HNTDVote.destroy({ where: { tipId: tip.id } });
    await tip.destroy();
    res.json({ message: 'Deleted' });
  } catch (err: any) { res.status(500).json({ message: err.message }); }
});

export default router;
