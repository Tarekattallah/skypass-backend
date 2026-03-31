const User = require('./user.model');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};
const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already in use', 400);

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  // لو المستخدم م موجود
  if (!user) throw new AppError('Invalid email or password', 401);
  const isMatch = await user.comparePassword(password);
  // دي لو الباسورد غلط
  if (!isMatch) throw new AppError('Invalid email or password', 401);

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
// تصدير الدوال زي مسح الملفات التانيه باستخدام اللوجين والريجيستر
module.exports = { register, login };
















// هذا الملف يحتوي على Authentication Service المسؤول عن تسجيل المستخدمين وتسجيل الدخول.
// عند التسجيل يتم التأكد أن البريد الإلكتروني غير مستخدم ثم إنشاء المستخدم وإنشاء JWT Token.
// وعند تسجيل الدخول يتم التحقق من البريد وكلمة المرور ثم إنشاء Token وإرجاع بيانات المستخدم.