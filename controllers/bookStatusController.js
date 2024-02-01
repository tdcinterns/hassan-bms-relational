// controllers/bookStatusController.js

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

module.exports = {
  updateBookStatus: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { action } = req.body;

      const existingBookStatus = await prisma.bookStatus.findUnique({
        where: {
          BookID: bookId,
        },
      });

      if (!existingBookStatus) {
        // If no existing status, create a new entry
        const newBookStatus = await prisma.bookStatus.create({
          data: {
            StatusID: uuidv4(),
            BookID: bookId,
            TotalBought: action === 'buy' ? 1 : 0,
            TotalRental: action === 'rent' ? 1 : 0,
          },
        });

        res.status(201).json({ message: 'Book status created successfully', bookStatus: newBookStatus });
      } else {
        // If existing status, update the counters
        const updatedBookStatus = await prisma.bookStatus.update({
          where: {
            StatusID: existingBookStatus.StatusID,
          },
          data: {
            TotalBought: existingBookStatus.TotalBought + (action === 'buy' ? 1 : 0),
            TotalRental: existingBookStatus.TotalRental + (action === 'rent' ? 1 : 0),
          },
        });

        res.status(200).json({ message: 'Book status updated successfully', bookStatus: updatedBookStatus });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
