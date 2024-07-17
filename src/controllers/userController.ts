// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';
import UsersRoles from '../models/usersRoles';

interface AuthRequest extends Request {
  user?: {
    userId: number;
    username: string;
    roleId: number;
  };
}

// Регистрация пользователя
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, email, roleId: 2 }); // Assigning default roleId to 2 (User)
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

    const token = jwt.sign({ userId: user.id, username: user.username, roleId: user.roleId }, 'your_jwt_secret', {
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

    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Изменение роли пользователя
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { roleId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const roleInstance = await Role.findByPk(roleId);
    if (!roleInstance) {
      return res.status(404).json({ message: 'Role not found' });
    }

    await user.update({ roleId });

    // Update the UsersRoles table
    await UsersRoles.update(
      { deletedAt: new Date() },
      { where: { userId: user.id, deletedAt: null } }
    );

    await UsersRoles.create({
      userId: user.id,
      roleId: roleInstance.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
