import { asyncError, errorHandler } from '@/middlewares/error';
import Task from '@/models/task';
import { checkAuth, connectDB } from '@/utils/features';

const handler = asyncError(async (req, res) => {
  if (req.method !== 'POST')
    return errorHandler(res, 400, 'Only POST method is allowed');
  await connectDB();

  const { title, description } = req.body;

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, 'Login First');

  await Task.create({
    title,
    description,
    user:user._id,
  });

  await res.status(200).json({
    success: true,
    message: 'Task created',
  });
});

export default handler;
