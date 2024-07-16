import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, updateUserRole } from '../controllers/userController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.put('/:userId/role', authenticate, authorizeAdmin, updateUserRole);

export default router;
