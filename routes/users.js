const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

/* Registration Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "Registration successful!", email: newUser.email });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Registration failed!" });
    }
});*/


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new one
            const hashedPassword = await bcryptjs.hash(password, 10);

            user = new User({
                name,
                email,
                password: hashedPassword
            });

            await user.save();
        }

        // Always send "Registration successful!" even if the user already exists
        res.status(200).json({ message: "You can proceed !", email: user.email });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Registration failed!" });
    }
});






/* Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful!", email: user.email });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed!" });
    }
});*/

module.exports = router;