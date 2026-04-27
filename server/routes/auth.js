const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role, name, department } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, name, department });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: user._id, username: user.username, role: user.role, name: user.name, department: user.department } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;