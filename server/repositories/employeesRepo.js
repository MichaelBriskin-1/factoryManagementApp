const Employee = require('../models/employeeModel');

const getAllEmployees = (filters) => {
  return Employee.find(filters);
};

const getById = (id) => {
  return Employee.findById(id);
};

const addEmployee = (obj) => {
  const emp = new Employee(obj);
  return emp.save();
};

const updateEmployee = (id, obj) => {
  return Employee.findByIdAndUpdate(id, obj, { new: true });
};

const deleteEmployee = (id) => {
  return Employee.findByIdAndDelete(id);
};

const getEmployeesByDepartment = (departmentId) => {
  if (!departmentId) {
    throw new Error('Department ID is required');
  }
  return Employee.find({ departmentId });
};

const deleteEmployeesByDepartment = (departmentId) => {
  return Employee.deleteMany({ departmentId });
};


module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  deleteEmployeesByDepartment
};
