//

const authController = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
authController.post('/register', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log request body

    const { email, password, username } = req.body;

    // Validate request data
    if (!email || !password || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Remove password before sending the response
    const { password: _, ...others } = newUser._doc;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    return res.status(201).json({ user: others, token });
  } catch (error) {
    console.error('Registration Error:', error); // Log the full error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login
authController.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials!' });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });

    const { password: _, ...others } = user._doc;
    return res.status(200).json({ user: others, token });
  } catch (error) {
    console.error('Login Error:', error); // Log the full error
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = authController;
