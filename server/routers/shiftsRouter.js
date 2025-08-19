const express = require('express');
const shiftsRepo = require('../repositories/shiftsRepo');

const router = express.Router();

// GET /shifts
router.get('/', async (_req, res) => {
  try {
    const shifts = await shiftsRepo.getAllShifts();
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /shifts/:id
router.get('/:id', async (req, res) => {
  try {
    const shift = await shiftsRepo.getShiftById(req.params.id);
    if (!shift) return res.status(404).json({ error: 'Not found' });
    res.json(shift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /shifts (create new shift)
router.post('/', async (req, res) => {
  try {
    const created = await shiftsRepo.addShift(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /shifts/:id (update date/time or employees set)
router.put('/:id', async (req, res) => {
  try {
    const updated = await shiftsRepo.updateShift(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /shifts/:id/add-employee/:employeeId
router.post('/:id/add-employee/:employeeId', async (req, res) => {
  try {
    const updated = await shiftsRepo.addEmployeeToShift(
      req.params.id,
      req.params.employeeId
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
