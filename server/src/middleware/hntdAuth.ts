// File: server/src/middleware/hntdAuth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = () => process.env.HNTD_JWT_SECRET || process.env.JWT_SECRET_KEY || '';

export const generateHNTDToken = (userId: number, username: string): string =>
  jwt.sign({ userId, username }, secret(), { expiresIn: '1h' });

export const verifyHNTDToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { res.sendStatus(401); return; }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secret(), (err, decoded) => {
    if (err) { res.sendStatus(403); return; }
    req.user = { ...(decoded as object), _id: (decoded as any).userId } as any;
    next();
  });
};
