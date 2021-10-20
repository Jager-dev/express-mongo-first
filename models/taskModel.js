const mongoose = require("mongoose")
const {Schema} = require("mongoose");

const tasksSchema = new mongoose.Schema({
  title: {type: String, required: true},
  status: {type: String},
  _isDeleted: {type: Boolean, required: true, default: false},
  _deletedAt: {type: Schema.Types.Mixed, required: true, default: false},
  _createdAt: {type: Number, required: true, default: +new Date()}
}, {timestamps: true})

const tasksModel = mongoose.model("tasks", tasksSchema)

module.exports = tasksModel