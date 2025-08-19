const departmentRepo = require('../repositories/departmentRepo');
const employeesRepo = require('../repositories/employeesRepo');

const getAllDepartments = (filters) => {
  return departmentRepo.getAllDepartments(filters);
}

const getById = (id) => {
    return departmentRepo.getById(id)
}

const addDepartment =(obj) => {
    return departmentRepo.addDepartment(obj)
}

const updateDepartment = (id, obj) =>{
    return departmentRepo.updateDepartment(id,obj)
}

const deleteDepartment = (id) => {
    return employeesRepo.deleteEmployeesByDepartment(id)
      .then(() => departmentRepo.deleteDepartment(id));
}

module.exports = {
  getAllDepartments,
  getById,
  addDepartment,
  updateDepartment,
  deleteDepartment
};