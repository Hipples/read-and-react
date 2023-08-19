// https://mongoosejs.com/docs/guide.html#models
import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  type: String,
  price: Number,
  cover_url: String
});

export const Book = mongoose.model(BookSchema);