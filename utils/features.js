import mongoose from 'mongoose';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import User from '@/models/user';

export const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.DB_URL, {
    dbName: 'NextTodo',
  });
  console.log(`DB connected on ${connection.host}`);
};

export const cookieToken = (res, token, set) => {
  res.setHeader(
    'Set-Cookie',
    serialize('token', set ? token : '', {
      path: '/',
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.replace('token=', '');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};
