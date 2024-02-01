// controllers/authorContactController.js

const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();

module.exports = {
  getAllAuthorContacts: async (req, res) => {
    try {
      const authorContacts = await prisma.authorContact.findMany();
      res.status(200).json(authorContacts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAuthorContactById: async (req, res) => {
    try {
      const { contactId } = req.params;
      const authorContact = await prisma.authorContact.findUnique({
        where: {
          ContactID: contactId,
        },
      });

      if (!authorContact) {
        res.status(404).json({ error: 'Author contact not found' });
      } else {
        res.status(200).json(authorContact);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createAuthorContact: async (req, res) => {
    try {
      const { authorId, contactType, phoneNo, address } = req.body;

      const newAuthorContact = await prisma.authorContact.create({
        data: {
          ContactID: uuidv4(), // Generate UUID using uuidv4
          AuthorID: authorId,
          ContactType: contactType,
          PhoneNo: phoneNo,
          Address: address,
        },
      });

      res.status(201).json({ message: 'Author contact created successfully', authorContact: newAuthorContact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateAuthorContact: async (req, res) => {
    try {
      const { contactId } = req.params;
      const { contactType, phoneNo, address } = req.body;

      const updatedAuthorContact = await prisma.authorContact.update({
        where: {
          ContactID: contactId,
        },
        data: {
          ContactType: contactType,
          PhoneNo: phoneNo,
          Address: address,
        },
      });

      res.status(200).json({ message: 'Author contact updated successfully', authorContact: updatedAuthorContact });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteAuthorContact: async (req, res) => {
    try {
      const { contactId } = req.params;

      await prisma.authorContact.delete({
        where: {
          ContactID: contactId,
        },
      });

      res.status(200).json({ message: 'Author contact deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
