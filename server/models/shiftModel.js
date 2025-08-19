const mongoose = require('mongoose')


const shiftSchema = new mongoose.Schema({
   date: Date,
   startingHour: Number,
   endingHour: Number,
   employeesID:[{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }] 
})

const Shift = mongoose.model('shift', shiftSchema)

module.exports = Shift