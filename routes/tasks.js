const express = require("express")
const {updateTask} = require("../controllers/tasks");
const {deleteTask} = require("../controllers/tasks");
const {addTask} = require("../controllers/tasks");
const {tasksTimespan} = require("../controllers/tasks");
const {tasksList} = require("../controllers/tasks");

const router = express().Router

router.get("/:category", tasksList)
router.get("/:category/:timespan", tasksTimespan)
router.post("/:category", addTask)
router.delete("/:category/:id", deleteTask)
router.patch("/:category/:id", updateTask)

module.exports = router