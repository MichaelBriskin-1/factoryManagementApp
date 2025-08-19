const jwt = require('jsonwebtoken');
const usersRepo = require('../repositories/usersRepo');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

const verifyJWT = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token)
      return res.status(401).json({ error: 'Missing Authorization token' });

    const payload = jwt.verify(token, SECRET);
    const user = await usersRepo.getUserById(payload.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user; // Mongoose doc
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyJWT, SECRET };
