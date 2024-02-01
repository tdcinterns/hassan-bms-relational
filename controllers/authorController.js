// controllers/authorController.js

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

module.exports = {
  getAllAuthors: async (req, res) => {
    try {
      const authors = await prisma.authorAuthentication.findMany();
      res.status(200).json({ authors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAuthorById: async (req, res) => {
    try {
      const { authorId } = req.params;
      const author = await prisma.authorAuthentication.findUnique({
        where: {
          AuthorID: authorId,
        },
      });

      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      res.status(200).json({ author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createAuthor: async (req, res) => {
    try {
      const { Name, Username, Password } = req.body;

      const newAuthor = await prisma.authorAuthentication.create({
        data: {
          AuthorID: uuidv4(),
          Name,
          Username,
          Password,
        },
      });

      res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateAuthor: async (req, res) => {
    try {
      const { authorId } = req.params;
      const { Name, Username, Password } = req.body;

      const updatedAuthor = await prisma.authorAuthentication.update({
        where: {
          AuthorID: authorId,
        },
        data: {
          Name,
          Username,
          Password,
        },
      });

      res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteAuthor: async (req, res) => {
    try {
      const { authorId } = req.params;

      await prisma.authorAuthentication.delete({
        where: {
          AuthorID: authorId,
        },
      });

      res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
