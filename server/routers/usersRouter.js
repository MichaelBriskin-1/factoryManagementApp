const express = require('express');
const usersRepo = require('../repositories/usersRepo');

const router = express.Router();

// GET /users (read-only)
router.get('/', async (_req, res) => {
  try {
    const users = await usersRepo.getAllUsers();
    // Only expose safe fields
    const out = users.map((u) => ({
      id: u._id,
      fullName: u.fullName,
      maxActions: u.maxActions,
      actionsLeft: u.actionsLeft,
    }));
    res.json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
