// controllers/genreController.js

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

module.exports = {
  getAllGenres: async (req, res) => {
    try {
      const genres = await prisma.genre.findMany();
      res.status(200).json({ genres });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getGenreById: async (req, res) => {
    try {
      const { genreId } = req.params;
      const genre = await prisma.genre.findUnique({
        where: {
          GenreID: genreId,
        },
      });

      if (!genre) {
        return res.status(404).json({ error: 'Genre not found' });
      }

      res.status(200).json({ genre });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createGenre: async (req, res) => {
    try {
      const { GenreName } = req.body;

      const newGenre = await prisma.genre.create({
        data: {
          GenreID: uuidv4(),
          GenreName,
        },
      });

      res.status(201).json({ message: 'Genre created successfully', genre: newGenre });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateGenre: async (req, res) => {
    try {
      const { genreId } = req.params;
      const { GenreName } = req.body;

      const updatedGenre = await prisma.genre.update({
        where: {
          GenreID: genreId,
        },
        data: {
          GenreName,
        },
      });

      res.status(200).json({ message: 'Genre updated successfully', genre: updatedGenre });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteGenre: async (req, res) => {
    try {
      const { genreId } = req.params;

      await prisma.genre.delete({
        where: {
          GenreID: genreId,
        },
      });

      res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
