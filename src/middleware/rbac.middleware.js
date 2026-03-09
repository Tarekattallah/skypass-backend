const jwt = require('jsonwebtoken');
const User = require('../modules/auth/user.model');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new AppError('Not authenticated', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) throw new AppError('User not found', 401);

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { protect };