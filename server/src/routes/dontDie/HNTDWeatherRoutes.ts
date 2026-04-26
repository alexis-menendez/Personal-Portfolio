// File: server/src/routes/dontDie/HNTDWeatherRoutes.ts

import { Router, Request, Response } from 'express';

const router = Router();
const OWM_BASE = 'https://api.openweathermap.org/data/2.5/weather';

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { city } = req.query;
  if (!city || typeof city !== 'string') {
    res.status(400).json({ message: 'City parameter required' }); return;
  }

  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) { res.status(500).json({ message: 'Weather API not configured' }); return; }

  try {
    const url = `${OWM_BASE}?q=${encodeURIComponent(city)}&appid=${key}&units=imperial`;
    const upstream = await fetch(url);

    if (upstream.status === 404) {
      res.status(404).json({ message: 'Location not found' }); return;
    }
    if (!upstream.ok) {
      res.status(502).json({ message: 'Weather service unavailable' }); return;
    }

    const data = await upstream.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
