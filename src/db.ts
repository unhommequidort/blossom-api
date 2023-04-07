import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    if (connection) {
      console.log('Connected to database');
    }
  } catch (error) {
    console.log('err in connect to database', error);
    throw error;
  }
};
