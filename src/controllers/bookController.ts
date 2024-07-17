// src/controllers/bookController.ts
import { Request, Response } from 'express';
import Book from '../models/book';
import { AuthRequest } from '../middlewares/authMiddleware';

export const addBook = async (req: AuthRequest, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;

  try {
    const book = await Book.create({ title, author, publicationDate, genres });
    res.status(201).json(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, author, publicationDate, genres } = req.body;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.publicationDate = publicationDate;
    book.genres = genres;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await book.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
