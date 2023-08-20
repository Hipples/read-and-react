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
// this middleware parses incoming requests with URL-encoded payloads (e.g., form submissions) and makes the parsed data available under the req.body property; the 'extended: true' option allows parsing of more complex data structures, such as nested objects
app.use(express.urlencoded({ extended: true }));
// this middleware parses incoming requests with JSON payloads (common with REST APIs) and makes the parsed data available under the req.body property
app.use(express.json());

// add a new Book to the database
app.post("/api/books", async (req, res) => {
  try {
    console.log(req.body);  // for debugging purposes
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
    res.json("Data submitted.");
  } catch (error) { 
    console.error("Error occurred while adding a book:", error);
    res.status(500).json({ error: "An error occurred while adding a book." });
  }
});

// update a book in the database
app.put("/api/books", async (req, res) => {
  let bookId;
  try {
    console.log(req.body);  // for debugging purposes
    bookId = req.body.bookId;
    const updateBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      type: req.body.type,
      price: req.body.price,
      cover_url: req.body.cover_url,
      isbn: req.body.isbn
    }
    await Book.findByIdAndUpdate(bookId, updateBook);
    res.json(`Book with id ${bookId} has been updated.`);
  } catch (error) { 
    console.error(`Error occurred while updating the book with ID ${bookId}:, ${error}`);
    res.status(500).json({ error: `An error occurred while updating the book with ID ${bookId}.` }); 
  }
});

// delete a book from the database
app.delete("/api/books/:id", async (req, res) => {
  // capture book id from URL parameter
  const bookId = req.params.id;
  console.log(`Attempting to delete book with ID: ${bookId}`)  // debugging purposes
  try {
    // attempt to delete book with the given ID
    const result = await Book.deleteOne({ _id: bookId });
    console.log(`Deletion result: ${result}`);  // debugging purposes    
    // send a response to the client with a message and the deleted book's ID
    res.json(`How dare you! Book with ID ${bookId} has been deleted.`);  
  } catch (error) {
    // log the error that occurred (debugging purposes)
    console.error(`Error occurred while deleting the book with ID ${bookId}: ${error}`);
    // send response to client with error
    res.status(500).json({ error: `An error occurred while deleting the book with ID ${bookId}.` }); 
  }
});

// define route to handle GET request at the root path
app.get("/", (req, res) => {
  res.json("Hello mate!");
});

// define a catch-all route for any requests that do not match any other routes
app.get("*", (req, res) => {
  // when accessed, respond with a 404 error code
  res.sendStatus(404);
});

// start express server and listen for incoming requests at specified port
app.listen(PORT, () => { console.log(`Server is running on Port: http://localhost:${PORT}`) });
