const express = require('express');
const employeesRepo = require('../repositories/employeesRepo');
const shiftsRepo = require('../repositories/shiftsRepo');

const router = express.Router();

// GET /employees?departmentId=...
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.departmentId) filters.departmentId = req.query.departmentId;
    const employees = await employeesRepo.getAllEmployees(filters);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /employees/:id
router.get('/:id', async (req, res) => {
  try {
    const emp = await employeesRepo.getById(req.params.id);
    if (!emp) return res.status(404).json({ error: 'Not found' });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /employees
router.post('/', async (req, res) => {
  try {
    const created = await employeesRepo.addEmployee(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /employees/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await employeesRepo.updateEmployee(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /employees/:id (also remove from all shifts)
router.delete('/:id', async (req, res) => {
  try {
    await shiftsRepo.removeEmployeeFromAllShifts(req.params.id);
    const result = await employeesRepo.deleteEmployee(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /employees/:id/assign-shift/:shiftId
router.post('/:id/assign-shift/:shiftId', async (req, res) => {
  try {
    const updatedShift = await shiftsRepo.addEmployeeToShift(
      req.params.shiftId,
      req.params.id
    );
    res.json(updatedShift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
