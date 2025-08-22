// Use the correct pluralised repository names. There is no `departmentRepo` file,
// the actual repository for departments is `departmentsRepo.js`.
const departmentsRepo = require('../repositories/departmentsRepo');
const employeesRepo = require('../repositories/employeesRepo');

const getAllDepartments = () => {
  // The departments repository does not currently support filters, so just
  // return all departments.
  return departmentsRepo.getAllDepartments();
};

const getById = (id) => {
  return departmentsRepo.getDepartmentById(id);
};

const addDepartment = (obj) => {
  return departmentsRepo.addDepartment(obj);
};

const updateDepartment = (id, obj) => {
  return departmentsRepo.updateDepartment(id, obj);
};

const deleteDepartment = (id) => {
  // When deleting a department we also delete all of its employees and remove
  // them from any shifts. This mirrors the logic in the departments router.
  return employeesRepo.deleteEmployeesByDepartment(id).then(() =>
    departmentsRepo.deleteDepartment(id)
  );
};

module.exports = {
  getAllDepartments,
  getById,
  addDepartment,
  updateDepartment,
  deleteDepartment
};