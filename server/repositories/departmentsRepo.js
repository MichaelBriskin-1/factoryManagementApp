const Department = require('../models/departmentModel');


const getAllDepartments = () => {
  return Department.find();
};

const getDepartmentById = (id) => {
  return Department.findById(id);
};

const addDepartment = (obj) => {
  const dep = new Department(obj);
  return dep.save();
};

const updateDepartment = (id, obj) => {
  return Department.findByIdAndUpdate(id, obj);
};

const deleteDepartment = (id) => {
  return Department.findByIdAndDelete(id);
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
