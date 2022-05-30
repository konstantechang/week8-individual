const jwt = require('jsonwebtoken');

const User = require('../models/user');
const handleErrorAsync = require('./handleErrorAsync');
const appError = require('../utils/appError');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpires = process.env.JWT_EXPIRES_DAY;

const isAuthor = handleErrorAsync(async (req, res, next) => {
  const accessToken = req.header('Authorization')?.split('Bearer ').pop();
  if (!accessToken) {
    return appError(401, '未帶入驗證碼，請重新登入！', next);
  }
  try {
    const decoded = jwt.verify(accessToken, jwtSecret);
    const currentUser = await User.findById(decoded.id).exec();
    req.user = currentUser;
    next();
  } catch (err) {
    return appError(401, '驗證失敗，請重新登入！', next);
  }
});

const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    photo: user.photo,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpires });
};

module.exports = { isAuthor, generateToken };