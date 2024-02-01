const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { Name, Username, Password } = req.body;

    // Check if the username is already taken
    const existingUser = await prisma.AuthorAuthentication.findFirst({
      where: {
        Username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new AuthorAuthentication entry with hashed password
    const newUser = await prisma.AuthorAuthentication.create({
      data: {
        AuthorID: uuidv4(),
        Name,
        Username,
        Password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error in signup controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    // Find the user by username
    const user = await prisma.AuthorAuthentication.findFirst({
      where: {
        Username,
      },
    });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a session to mark the user as authenticated
    req.session.userId = user.AuthorID;

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error in login controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
