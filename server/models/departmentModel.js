const mongoose = require('mongoose')


const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
    
})

const Department = mongoose.model('department', departmentSchema)

module.exports = Department