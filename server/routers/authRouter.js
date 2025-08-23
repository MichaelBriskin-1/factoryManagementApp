const express = require('express');
const router = express.Router();
const usersRepo = require('../repositories/usersRepo');

router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email } = req.body;
    if (!fullName || !username || !email) {
      return res
        .status(400)
        .json({ error: 'fullName, username and email are required' });
    }

    const exists = await usersRepo.findByUsernameOrEmail(username, email);
    if (exists) return res.status(409).json({ error: 'User already exists' });

    const created = await usersRepo.create({ fullName, username, email }); // defaults handle quota
    return res.status(201).json({ id: created.id });
  } catch (err) {
    // Handle duplicate key or validation errors cleanly
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'User already exists' });
    }
    console.error('REGISTER_ERROR', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'username and email are required' });
    }
  } catch (err) {
    console.error('LOGIN_ERROR', err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
