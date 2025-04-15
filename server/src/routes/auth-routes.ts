// Path: server/src/routes/auth-routes.ts
// This file is used to handle authentication

import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {

  try{
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';
if (!secretKey) {
    return res.status(500).json({ message: 'JWT secret key is not configured' });
  }
  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, {
    expiresIn: '1h',
  });

  return res.status(200).json({ token });
} catch (error) {
  console.error('Error during login:', error);
  return res.status(500).json({ message: 'Internal server error' });
}
};


const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
