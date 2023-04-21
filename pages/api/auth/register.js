import User from '@/models/user';
import { connectDB, cookieToken, generateToken } from '@/utils/features';
import bcrypt from 'bcrypt';

const { asyncError, errorHandler } = require('@/middlewares/error');

const handler = asyncError(async (req, res) => {
  if (req.method !== 'POST')
    return errorHandler(res, 400, 'Only POST method is allowed');
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return errorHandler(res, 400, 'Name, Email and Password are required');
  }

  await connectDB();

  let user = await User.findOne({ email });
  if (user) {
    return errorHandler(res, 400, 'User already registered');
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  const token = generateToken(user._id);

  cookieToken(res, token, true);

  res.status(201).json({
    success: true,
    message: 'Registered Successfully!',
    user,
  });
});

export default handler;
