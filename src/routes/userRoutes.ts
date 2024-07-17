// src/routes/userRoutes.ts
import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, updateUserRole } from '../controllers/userController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.patch('/:userId/role', authenticate, authorizeAdmin, updateUserRole);

export default router;
