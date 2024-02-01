// controllers/bookController.js

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json({ books });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const { bookId } = req.params;
      const book = await prisma.book.findUnique({
        where: {
          BookID: bookId,
        },
      });

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.status(200).json({ book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createBook: async (req, res) => {
    try {
      const { GenreID, AuthorID, Title } = req.body;

      const newBook = await prisma.book.create({
        data: {
          BookID: uuidv4(),
          GenreID,
          AuthorID,
          Title,
        },
      });

      res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateBook: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { GenreID, AuthorID, Title } = req.body;

      const updatedBook = await prisma.book.update({
        where: {
          BookID: bookId,
        },
        data: {
          GenreID,
          AuthorID,
          Title,
        },
      });

      res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const { bookId } = req.params;

      await prisma.book.delete({
        where: {
          BookID: bookId,
        },
      });

      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
