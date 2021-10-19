const express = require("express")
const {updateTask} = require("../controllers/tasks");
const {deleteTask} = require("../controllers/tasks");
const {addTask} = require("../controllers/tasks");
const {tasksTimespan} = require("../controllers/tasks");
const {tasksList} = require("../controllers/tasks");

const router = express().Router

router.get("/", tasksList)
router.get("/:timespan", tasksTimespan)
router.post("/", addTask)
router.delete("/:id", deleteTask)
router.patch("/:id", updateTask)

module.exports = router