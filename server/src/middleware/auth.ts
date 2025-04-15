// Path: server/src/middleware/auth.ts
// This file is used to handle authentication

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void | Response => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user as JwtPayload;
    return next(); // Explicitly return after calling next()
  });

  return; // Ensure the function always ends
};


