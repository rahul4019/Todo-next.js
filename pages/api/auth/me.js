import { checkAuth } from '@/utils/features';
const { asyncError, errorHandler } = require('@/middlewares/error');

const handler = asyncError(async (req, res) => {
  const user = await checkAuth(req);

  if (!user) return errorHandler(req, 401, 'Login first');

  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;
