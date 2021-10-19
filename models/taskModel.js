const mongoose = require("mongoose")

const tasksSchema = new mongoose.Schema({
  title: {type: String, required: true},
  status: {type: String},
  _isDeleted: {type: Boolean, required: true, default: false},
  _deletedAt: {type: Boolean, required: true, default: false}
}, {timestamps: true})

const tasksModel = mongoose.model("tasks", tasksSchema)

module.exports = tasksModel