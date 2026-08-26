import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Falls back gracefully with informative log if MongoDB is not running locally.
 */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/finwiz_nitw';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} [Database: ${conn.connection.name}]`);
    return true;
  } catch (error) {
    console.warn(`MongoDB Connection Warning: ${error.message}`);
    console.warn(`Tip: Backend will use in-memory fallback mock storage until MongoDB is connected.`);
    return false;
  }
};
