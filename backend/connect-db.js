// https://mongoosejs.com/docs/connections.html
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}