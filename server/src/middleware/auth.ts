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
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token has expired' });
      }
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user as JwtPayload;
    return next(); // Explicitly return after calling next()
  });

  return; // Ensure the function always ends
};

// Example function to generate tokens
export const generateTokens = (username: string) => {
  // Generate JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '15m', // Short-lived access token
  });

  // Generate a refresh token (optional)
  const refreshToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: '7d', // Longer-lived refresh token
  });

  return { token, refreshToken };
};


