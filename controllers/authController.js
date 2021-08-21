const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('./../models/User');
const signToken = require('./../utils/signToken');
const { promisify } = require('util');
const { verify } = require('jsonwebtoken');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('User is not allowed perform this action!', 401)
      );
    }
    next();
  };
};

exports.facebookLogin = catchAsync(async (req, res, next) => {
  const { facebookId, name, email, profileImage } = req.body;
  let user = await User.findOne({ facebookId });
  if (!user) {
    const newUser = await User.create({
      facebookId,
      name,
      email,
      profileImage,
    });
    user = newUser;
    console.log('nguoi moi');
  }
  const token = signToken({ id: user._id });
  res.status(202).json({
    _id: user._id,
    facebookId: user.facebookId,
    username: user.username,
    name: user.name,
    email: user.email,
    profileImage: user.profileImage,
    phone: user.phone,
    address: user.address,
    role: user.role,
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers || !req.headers.authorization)
    throw new AppError('You have to be logged in to access this route', 403);
  const token = req.headers.authorization.split(' ')[1];
  if (!token)
    throw new AppError('You have to be logged in to access this route', 401);
  const decoded = await promisify(verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    throw new AppError('Cant find this user, please login again!', 401);

  req.user = currentUser;
  next();
});
