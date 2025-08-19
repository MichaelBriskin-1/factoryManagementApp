const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    maxActions: { type: Number, default: 10 },
    actionsLeft: { type: Number, default: 10 },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
