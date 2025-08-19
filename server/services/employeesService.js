const employeesRepo = require('../repositories/employeesRepo');


  const getAllEmployees=(filters) => {
    return employeesRepo.getAllEmployees(filters);
  }

  const getEmployeesByDepartment = (departmentId) => {
    if (!departmentId) {
      throw new Error('Department ID is required');
    }
    return employeesRepo.getAllEmployees({ departmentId });
  };

  const getById = (id) => {

    return employeesRepo.getById(id);
  };

  const addEmployee = (obj) => {
    return employeesRepo.addEmployee(obj);
  };

  const updateEmployee = (id, obj) => {
    return employeesRepo.updateEmployee(id, obj);
  };

  const deleteEmployee = (id) => {
    return employeesRepo.deleteEmployee(id);
  };



module.exports = {
  getAllEmployees,
  getById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
};
