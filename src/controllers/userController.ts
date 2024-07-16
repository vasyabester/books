import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

// Регистрация пользователя
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Аутентификация пользователя
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, 'your_jwt_secret', {
      expiresIn: '24h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Получение текущего пользователя
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

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

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Изменение роли пользователя
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { role } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const roleInstance = await Role.findOne({ where: { name: role } });
    if (!roleInstance) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await user.addRole(roleInstance);

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
