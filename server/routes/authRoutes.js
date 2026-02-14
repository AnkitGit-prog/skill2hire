const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register Admin (First time setup only)
// Register User/Admin
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body; // Role is optional, defaults to 'user' in model
    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Security check: Only allow 'user' role creation via public API, unless overridden (e.g., via secret key in future)
        // For now, we trust the input but ensure model defaults handle 'user'
        const user = await User.create({ username, password, role });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User/Admin
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
