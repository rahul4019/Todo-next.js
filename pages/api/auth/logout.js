import { cookieToken } from '@/utils/features';

const { asyncError, errorHandler } = require('@/middlewares/error');

const handler = asyncError(async (req, res) => {
  cookieToken(res, null, false);

  res.status(200).json({
    success: true,
    message: `Logged Out Successfully`,
  });
});

export default handler;
