import { Router } from 'express';
import { addBook, getBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

// router.post('/', authenticate, authorizeAdmin, addBook);
router.post('/', addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authenticate, authorizeAdmin, updateBook);
router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

export default router;
