import { connectDB } from '@/utils/features';
import mongoose from 'mongoose';
const User = mongoose.model('User');
import {serialize} from "cookie"

const { asyncError, errorHandler } = require('@/middlewares/error');

const handler = asyncError(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorHandler(res, 400, 'Name, Email and Password are required');
  }

  await connectDB();

  const user = await User.findOne({ email });
  if (user) {
    return errorHandler(res, 400, 'User already registered');
  }

  await User.create({
    name,
    email,
    password,
  });

  res.setHeader()
});

export default handler;
