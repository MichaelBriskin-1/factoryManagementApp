const Employee = require('../models/employeeModel');

const getAllEmployees = (filters = {}) => Employee.find(filters);
const getById = (id) => Employee.findById(id);
const addEmployee = (obj) => new Employee(obj).save();
const updateEmployee = (id, obj) =>
  Employee.findByIdAndUpdate(id, obj, { new: true });
const deleteEmployee = (id) => Employee.findByIdAndDelete(id);
const getEmployeesByDepartment = (departmentId) =>
  Employee.find({ departmentId });
const deleteEmployeesByDepartment = (departmentId) =>
  Employee.deleteMany({ departmentId });

module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  deleteEmployeesByDepartment,
};
