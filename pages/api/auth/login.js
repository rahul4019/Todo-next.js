import User from '@/models/user';
import { connectDB, cookieToken, generateToken } from '@/utils/features';
import bcrypt from 'bcrypt';

const { asyncError, errorHandler } = require('@/middlewares/error');

const handler = asyncError(async (req, res) => {
  if (req.method !== 'POST')
    return errorHandler(res, 400, 'Only POST method is allowed');
  const { name, email, password } = req.body;

  if (!email || !password) {
    return errorHandler(res, 400, 'Email and Password are required');
  }

  await connectDB();

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return errorHandler(res, 400, 'User Not Registered');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    return errorHandler(res, 400, 'Invalid Email or Password');
  }

  const token = generateToken(user._id);

  cookieToken(res, token, true);

  res.status(200).json({
    success: true,
    message: `Welcome back ${user.name}`,
    user,
  });
});

export default handler;
