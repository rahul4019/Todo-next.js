import { asyncError, errorHandler } from '@/middlewares/error';
import Task from '@/models/task';
import { checkAuth, connectDB } from '@/utils/features';

const handler = asyncError(async (req, res) => {
  await connectDB();

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, 'Login First');

  const tasks = await Task.find({ user: user._id });

  await res.status(200).json({
    success: true,
    tasks,
  });
});

export default handler;
