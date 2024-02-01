require('dotenv').config(); 

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session'); 
const authRoutes = require('./routes/authRoutes');
const bookStatusRoutes = require('./routes/bookStatusRoutes');
const bookRoutes = require('./routes/bookRoutes');
const genreRoutes = require('./routes/genreRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authorContactRoutes = require('./routes/authorContactRoutes'); 


app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/auth', authRoutes);
app.use('/book-status', bookStatusRoutes);
app.use('/books', bookRoutes);
app.use('/genres', genreRoutes);
app.use('/authors', authorRoutes);
app.use('/author-contacts', authorContactRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

