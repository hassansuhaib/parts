const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  BaseVehicleID: Number,
  MakeName: String,
  ModelName: String,
  SubModelName: String,
  Year: Number,
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
