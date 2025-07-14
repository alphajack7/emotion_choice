import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { loginLimiter, registerLimiter } from '../middleware/rateLimiter.js';
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register admin (only once)
router.post('/register', registerLimiter, async (req, res) => {
  const { username, password } = req.body;

  const usernameRegex = /^[a-z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message: 'Username must contain only lowercase letters and numbers (no spaces or symbols).'
    });
  }

  if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({
        message: 'Password must be at least 8 characters long and include at least one uppercase letter and one number.'
    });
  }
  try {
    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login admin
router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ adminId: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

export default router;
