import mongoose from 'mongoose';

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL, {
    dbName: 'NextTodo',
  });
  console.log(`DB connected on ${connection.host}`);
};

