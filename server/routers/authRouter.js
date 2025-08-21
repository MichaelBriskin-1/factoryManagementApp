const express = require('express');
const jwt = require('jsonwebtoken');
const loginRepo = require('../repositories/loginRepo');
const usersRepo = require('../repositories/usersRepo');
const { SECRET, verifyJWT } = require('../middlewares/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, email } = req.body || {};
    if (!username || !email)
      return res.status(400).json({ error: 'username and email are required' });

    const { data: remoteUsers } = await loginRepo.getAllUsers();
    const match = remoteUsers.find(
      (u) => u.username === username && u.email === email
    );
    if (!match)
      return res
        .status(401)
        .json({ error: 'Credentials not recognized by external service' });

    // Must be pre-registered locally
    const registered = (await usersRepo.getAllUsers()).find(
      (u) => u.username === username && u.email === email
    );
    if (!registered)
      return res
        .status(401)
        .json({ error: 'User is not registered in this system' });

    const token = jwt.sign({ userId: registered._id.toString() }, SECRET, {
      expiresIn: '8h',
    });

    return res.json({
      token,
      user: {
        id: registered._id,
        fullName: registered.fullName,
        maxActions: registered.maxActions,
        actionsLeft: registered.actionsLeft,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /auth/me (verify token, return minimal user info)
router.get('/me', verifyJWT, async (req, res) => {
  const u = req.user;
  res.json({
    id: u._id,
    fullName: u.fullName,
    maxActions: u.maxActions,
    actionsLeft: u.actionsLeft,
  });
});

module.exports = router;
