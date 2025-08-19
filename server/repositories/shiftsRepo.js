const Shift = require('../models/shiftModel');

const getAllShifts = () => Shift.find();
const getShiftById = (id) => Shift.findById(id);
const addShift = (obj) => new Shift(obj).save();
const updateShift = (id, obj) =>
  Shift.findByIdAndUpdate(id, obj, { new: true });

const addEmployeeToShift = (shiftId, employeeId) =>
  Shift.findByIdAndUpdate(
    shiftId,
    { $addToSet: { employeesID: employeeId } },
    { new: true }
  );

const removeEmployeeFromShift = (shiftId, employeeId) =>
  Shift.findByIdAndUpdate(
    shiftId,
    { $pull: { employeesID: employeeId } },
    { new: true }
  );

const removeEmployeeFromAllShifts = (employeeId) =>
  Shift.updateMany({}, { $pull: { employeesID: employeeId } });

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  addEmployeeToShift,
  removeEmployeeFromShift,
  removeEmployeeFromAllShifts,
};
