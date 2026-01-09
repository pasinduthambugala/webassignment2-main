const bigPromise = require('../middlewares/bigPromise');
const CustomError = require('../utils/customError');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

// Register
exports.register = bigPromise(async (req, res, next) => {
    let { name, email, password, username } = req.body;

    if (!name || !email || !password) {
        return next(new CustomError('All fields are required', 400));
    }

    name = String(name).trim();
    email = String(email).trim().toLowerCase();

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new CustomError('User already exists', 400));
    }

    if (username) {
        username = String(username).trim();
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return next(new CustomError('Username already exists', 400));
        }
    }

    // If username not provided, generate a simple slug from the name and ensure uniqueness
    if (!username) {
        const base = name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'user';
        let candidate = base;
        let suffix = 0;
        while (await User.findOne({ username: candidate })) {
            suffix += 1;
            candidate = `${base}${Math.floor(Math.random() * 9000) + suffix}`;
            if (suffix > 10) break;
        }
        username = candidate;
    }

    const user = await User.create({
        name,
        email,
        password,
        username,
    });

    if (!user) return next(new CustomError('Invalid user data', 400));

    res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.role === 'admin',
        token: generateToken(user._id),
    });
});

// Login
exports.login = bigPromise(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new CustomError('Email and password are required', 400));
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.role === 'admin',
            token: generateToken(user._id),
        });
    } else {
        return next(new CustomError('Invalid email or password', 401));
    }
});

// Middleware to protect routes
exports.protect = bigPromise(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            return next(new CustomError('Not authorized, token failed', 401));
        }
    }

    if (!token) {
        return next(new CustomError('Not authorized, no token', 401));
    }
});

exports.admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return next(new CustomError('Not authorized as an admin', 401));
    }
};
