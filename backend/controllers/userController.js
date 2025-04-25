const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { userid, password, cpid } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ userid });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            userid,
            password,
            cpid
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                userid: user.userid,
                cpid: user.cpid,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { userid, password } = req.body;

        // Check for user email
        const user = await User.findOne({ userid }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userid: user.userid,
                cpid: user.cpid,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
}; 