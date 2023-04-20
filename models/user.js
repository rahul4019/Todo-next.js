import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, 'Password must be equal or greater than 6 charcters'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
