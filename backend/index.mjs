// using ES6 syntax requires extra steps for require() import method
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// ensure env variables are available throughout backend during development
if (process.env.ENV === 'dev') { require('dotenv').config() }

// express for app backend environment
import express from 'express';
// cors for cross-origin resource sharing ?
import cors from 'cors';
// mongoDB schema for book data
import Book from './models/books';
// mongoDB connection
import connectDB from './connect-db';

// create app
const app = express();
// define port
const PORT = process.env.PORT || 3000;

// connect to database
connectDB();
// cors middleware adds headers to responses that allow requests from different origins, which is useful when developing APIs that will be consumed by different domains
app.use(cors());
// this middleware parses incoming requests with URL-encoded payloads (e.g., form submissions) and makes the parsed data available under the req.body property; the 'extended: true' option allows parsing of more complex data structures
app.use(express.urlencoded({ extended: true }));
// this middleware parses incoming requests with JSON payloads (common with API clients) and makes the parsed data available under the req.body property
app.use(express.json());


// add a new Book in the database
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      type: req.body.type,
      price: req.body.price,
      cover_url: req.body.cover_url,
      isbn: req.body.isbn
    });
    await Book.create(newBook);
    res.json("Data submitted");
  } catch (error) { res.status(500).json({ error: "An error occurred while fetching books." }); }
});





app.get("/", (req, res) => {
  res.json("Hello mate!");
});

app.listen(PORT, () => { console.log(`Server is running on Port: http://localhost:${PORT}`) });