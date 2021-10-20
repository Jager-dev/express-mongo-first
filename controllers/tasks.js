const Tasks = require("../models/taskModel.js")

const tasksList = async (req, res) => {
  const data = await Tasks.find({})
  const filteredData = data
    .filter(item => !item._isDeleted)
    .map(item => {
    return {
      id: item._id,
      title: item.title,
      status: item.status
    }
  })
  res.json(filteredData)
}
const tasksTimespan = async (req, res) => {
  const data = await Tasks.find({})
  const duration = {
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "month": 1000 * 60 * 60 * 24 * 7 * 30,
    "year": 1000 * 60 * 60 * 24 * 365
  }
  const filteredData = data.filter(el => +new Date() - el._createdAt < duration[req.params.timespan])
  res.json(filteredData)
}
const addTask = async (req, res) => {
  try {
    const newTask = new Tasks({
      "title": req.body.title
    })
    const saveTask = await newTask.save()
    res.json(saveTask)
  } catch (e) {
    return res.status(401).json({error: "Ошибка сохранения"})
  }
}
const deleteTask = async (req, res) => {
  const updatedTask = await Tasks.findOneAndUpdate(
    {_id: req.params.id},
    {_isDeleted: true, _deletedAt: +new Date()},
    {new: true})
  res.json(updatedTask)
}
const updateTask = async (req, res) => {
  const id = req.params.id
  const status = req.body.status
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(status)) {
    const task = await Tasks.updateOne({_id: id}, {status}, {new: true})
    res.json({task})
  } else {
    res.status(501).json({'status': "error", 'message': "incorrect status"})
  }
}

module.exports = {tasksList, tasksTimespan, addTask, deleteTask, updateTask}