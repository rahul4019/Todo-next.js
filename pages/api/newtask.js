import { connectDB } from '@/utils/features';

const handler = async (req, res) => {
  await connectDB();
  res.status(200).json(process.env.DB_URL);
};

export default handler;
