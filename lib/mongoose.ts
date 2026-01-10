import mongoose, { Mongoose } from 'mongoose';

import logger from './logger';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
     'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
interface mongooseCache{
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}
declare global{
    var mongoose: mongooseCache;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

const dbConnect = async (): Promise<Mongoose> => {
  if (cached.conn) {
    logger.info("Using cached MongoDB connection");
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "devflow",
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 20000,
        family: 4,
      })
      .then((result) => {
        logger.info("Connected to MongoDB");
        return result;
      })
      .catch((error) => {
        logger.error("Error connecting to MongoDB", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;