import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';
import UsersRoles from '../models/usersRoles';
import transporter from '../config/mailConfig';
import nodemailer from 'nodemailer';

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
    const token = jwt.sign({ username, password: hashedPassword, email }, 'your_jwt_secret', { expiresIn: '1h' });

    const confirmationUrl = `http://localhost:3000/users/confirm/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Confirm your registration',
      text: `Hi ${username}, please confirm your registration by clicking the following link: ${confirmationUrl}`,
      html: `<p>Hi ${username},</p><p>Please confirm your registration by clicking the following link:</p><p><a href="${confirmationUrl}">${confirmationUrl}</a></p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    });

    res.status(201).json({ message: 'Confirmation email sent. Please check your email.' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Подтверждение пользователя
export const confirmUser = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded: any = jwt.verify(token, 'your_jwt_secret');
    const { username, password, email } = decoded;

    const user = await User.create({ username, password, email, roleId: 2 });
    res.status(200).json({ message: 'User confirmed and registered', user });
  } catch (error) {
    console.error('Error confirming user:', error);
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
    await UsersRoles.destroy({ where: { userId } });
    await UsersRoles.create({ userId, roleId });

    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
