const User = require('../models/userModel');

async function findByUsernameOrEmail(username, email) {
  return User.findOne({ $or: [{ username }, { email }] });
}

async function create({ fullName, username, email }) {
  // Don’t accept maxActions from client; rely on schema defaults
  const u = new User({ fullName, username, email });
  return u.save();
}

async function all() {
  return User.find().lean();
}

module.exports = {
  findByUsernameOrEmail,
  create,
  all,
};
