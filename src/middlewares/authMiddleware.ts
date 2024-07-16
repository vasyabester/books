import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

// Middleware для проверки аутентификации
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded as { userId: number; username: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware для проверки роли администратора
export const authorizeAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findByPk(req.user.userId, {
      include: [{
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isAdmin = user.roles?.some((role) => role.name === 'Administrator');

    if (!isAdmin) {
      return res.status(403).json({ message: 'User is not authorized' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
