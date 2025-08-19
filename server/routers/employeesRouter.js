import express from 'express';
import EmployeesService from '../services/employeesService.js';

const router = express.Router();

// Get All

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const employees = await EmployeesService.getAllEmployees(filters);
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// get by department
router.get('/by-department', async (req, res) => {
  try {
    const { departmentId } = req.query;
    const employees = await EmployeesService.getEmployeesByDepartment(
      departmentId
    );
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get by id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await EmployeesService.getById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Employee
router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await EmployeesService.addEmployee(obj);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//update employee

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await EmployeesService.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete employee

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await EmployeesService.deleteEmployee(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router
