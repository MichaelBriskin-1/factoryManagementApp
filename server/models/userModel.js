const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  // daily actions quota defaults; users can’t set these from client
  maxActions: { type: Number, default: 10 },
  actionsLeft: { type: Number, default: 10 },
  lastActionDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
});

module.exports = mongoose.model('User', UserSchema);
