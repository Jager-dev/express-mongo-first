const express = require("express")
const {tasksList, tasksTimespan, addTask, deleteTask, updateTask} = require("../controllers/tasks");

const router = express.Router()

router.get("/", tasksList)
router.get("/:timespan", tasksTimespan)
router.post("/", addTask)
router.delete("/:id", deleteTask)
router.patch("/:id", updateTask)

module.exports = router