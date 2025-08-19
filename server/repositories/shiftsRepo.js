const Shift = require('../models/shiftModel');



const getAllShifts = () => {
  return Shift.find();
};

const getShiftById = (id) => {
  return Shift.findById(id);
};

const addShift = (obj) => {
  const emp = new Shift(obj);
  return emp.save();
};

const updateShift = (id, obj) => {
    return Shift.findByIdAndUpdate(id, obj);
  };
  
  module.exports = {
    getAllShifts,
    getShiftById,
    addShift,
    updateShift,
  };
  