const User = require('../models/userModel');

const getAllUsers = () => {
  return User.find();
}

const getUserById = (id) => {
  return User.findById(id);
};

const addUser = (obj) => {
  const user = new User(obj);
  return user.save();
}

const updateUser = (id, obj) => {
  return User.findByIdAndUpdate(id, obj);
}; 

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
}        

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};