import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, updateUserRole, confirmUser } from '../controllers/userController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.patch('/:userId/role', authenticate, authorizeAdmin, updateUserRole);
router.get('/confirm/:token', confirmUser); // Новый маршрут для подтверждения регистрации

export default router;
