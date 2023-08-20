// https://mongoosejs.com/docs/guide.html#models
import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookSchema = new Schema({
  _id: Number,
  title: String,
  author: String,
  genre: String,
  type: String,
  price: Number,
  cover_url: String,
  ISBN: Number
});

export const Book = mongoose.model('Book', BookSchema);