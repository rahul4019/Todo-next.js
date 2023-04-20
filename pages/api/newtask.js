import { asyncError, errorHandler } from '@/middlewares/error';
import { connectDB } from '@/utils/features';
import mongoose from 'mongoose';
const Task = mongoose.model('Task');

const handler = asyncError(async (req, res) => {
  if (req.method !== 'POST')
    return errorHandler(res, 400, 'Only POST method is allowed');
  await connectDB();

  const { title, description } = req.body;

  const task = await Task.create({
    title,
    description,
    user: '6440d055f9b500fff40c2fdb',
  });

  await res.status(200).json({
    success: true,
    message: 'Task created',
  });
});

export default handler;
