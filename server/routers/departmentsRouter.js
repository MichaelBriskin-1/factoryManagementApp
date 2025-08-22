const express = require('express');
// Import repositories used by this router. Without these requires the names
// departmentsRepo, employeesRepo and shiftsRepo would be undefined at runtime.
const departmentsRepo = require('../repositories/departmentsRepo');
const employeesRepo = require('../repositories/employeesRepo');
const shiftsRepo = require('../repositories/shiftsRepo');

const router = express.Router();

// GET /departments
router.get('/', async (_req, res) => {
  try {
    const deps = await departmentsRepo.getAllDepartments();
    res.json(deps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /departments/:id
router.get('/:id', async (req, res) => {
  try {
    const dep = await departmentsRepo.getDepartmentById(req.params.id);
    if (!dep) return res.status(404).json({ error: 'Not found' });
    res.json(dep);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /departments
router.post('/', async (req, res) => {
  try {
    const created = await departmentsRepo.addDepartment(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /departments/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await departmentsRepo.updateDepartment(
      req.params.id,
      req.body
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /departments/:id (delete department and its employees; and pull them from shifts)
router.delete('/:id', async (req, res) => {
  try {
    const depId = req.params.id;
    const employees = await employeesRepo.getEmployeesByDepartment(depId);

    // remove each employee from shifts then delete employees
    for (const e of employees) {
      await shiftsRepo.removeEmployeeFromAllShifts(e._id);
    }
    await employeesRepo.deleteEmployeesByDepartment(depId);

    const result = await departmentsRepo.deleteDepartment(depId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /departments/:id/add-employee/:employeeId (reassign employee to this department)
router.put('/:id/add-employee/:employeeId', async (req, res) => {
  try {
    const emp = await employeesRepo.updateEmployee(req.params.employeeId, {
      departmentId: req.params.id,
    });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
