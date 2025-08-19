const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentId: String,
  },
  { versionKey: false }
);

const Employee = mongoose.model('employee', employeeSchema);
module.export = Employee;
