const fs = require("fs")
const {nanoid} = require("nanoid")

const readData = (fileName) => {
  try{
    return JSON.parse(fs.readFileSync(`./tasks${fileName}.json`, "utf-8"))
  }catch (e){
    return []
  }
}

const writeData = (fileName, data) => {
  fs.writeFileSync(`./tasks/${fileName}.json`, JSON.stringify(data, null, 2))
}

export const tasksList = (req, res, next) => {
  const data = readData(req.params.category)
  const filteredData = data.filter(item => !item._isDelted).map(item => {
    return{
      id: item.taskId,
      title: item.title,
      status: item.status
    }
  })
  res.json(filteredData)
  next()
}
export const tasksTimespan = (req, res) => {
  const data = readData(req.params.category)
  const duration = {
    "day": 1000 * 60 * 60 * 24,
    "week": 1000 * 60 * 60 * 24 * 7,
    "month": 1000 * 60 * 60 * 24 * 7 * 30,
    "year": 1000 * 60 * 60 * 24 * 365
  }
  const filteredData = data.filter(el => +new Date() - el._createdAt < duration[req.params.timespan])
  res.json(filteredData)
}
export const addTask = (req, res) => {
  // console.log(req.params.category)
  // console.log(req.body)
  const newTask = {
    "taskId": nanoid(2),
    "title": req.body.title,
    "status": 'new',
    "_isDeleted": false,
    "_createdAt": +new Date(),
    "_deletedAt": null
  }
  const data = readData(req.params.category)
  const updatedTasks = [...data, newTask]
  writeData(updatedTasks)
  res.json(newTask)
}
export const deleteTask = (req, res) => {
  const data = readData(req.params.category)
  const updatedTasks = data.map(el => el.taskId === req.params.id ? {
    ...el,
    _isDeleted: true,
    _deletedAt: +new Date()
  } : el)
  writeData(data)
  res.json(updatedTasks)
}
export const updateTask = (req, res) => {
  const statuses = ['new', 'in progress', 'done', 'blocked']
  if (statuses.includes(req.body.status)) {
    const data = readData(req.params.category)
    const updatedTasks = data.map(el => el.taskId === req.params.id ? {...el, status: req.body.status} : el)
    writeData(data)
    res.json(updatedTasks)
  } else {
    res.status(501).json({'status': "error", 'message': "incorrect status"})
  }
}

module.exports = {tasksList, tasksTimespan, addTask, deleteTask, updateTask}