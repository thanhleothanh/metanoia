const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    facebookId: { type: String },
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    role: { type: String, required: true, default: 'user' },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
