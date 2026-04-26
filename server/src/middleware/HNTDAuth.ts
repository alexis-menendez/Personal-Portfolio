// File: server/src/middleware/HNTDAuth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = () => process.env.HNTD_JWT_SECRET || process.env.JWT_SECRET_KEY || '';

export const generateHNTDToken = (userId: number, username: string): string =>
  jwt.sign({ userId, username }, secret(), { expiresIn: '7d' });

export const verifyHNTDToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { res.status(401).json({ message: 'No token provided' }); return; }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secret(), (err, decoded) => {
    if (err) { res.status(403).json({ message: 'Session expired. Please log in again.' }); return; }
    req.user = { ...(decoded as object), _id: (decoded as any).userId } as any;
    next();
  });
};
