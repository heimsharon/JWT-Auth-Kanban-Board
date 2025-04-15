// Path: server/src/middleware/auth.ts
// This file is used to handle authentication

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Middleware to authenticate JWT tokens

  const token = req.headers[ 'authorization' ]?.split(' ')[ 1 ];
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user as JwtPayload;
    return next();
  });
  return
};


