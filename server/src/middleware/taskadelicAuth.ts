// File: server/src/middleware/taskadelicAuth.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateTDToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) { res.sendStatus(401); return; }

  const token = authHeader.split(' ')[1];
  const secret = process.env.TD_JWT_SECRET || process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secret, (err, decoded) => {
    if (err) { res.sendStatus(403); return; }
    req.user = { ...(decoded as object), _id: (decoded as any).id } as any;
    next();
  });
};
