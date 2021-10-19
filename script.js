const express = require("express")
const tasksRoutes = require("./routes/tasks")
const mongoose = require("mongoose")

const server = express()

mongoose.connect("")
  .then(() => console.log("DB is connected"))
  .catch(() => console.log("error"))

server.use(express.json())
server.use((req, res,next) => {
  console.log("I am middleware :)")
})

server.use("/api/tasks", tasksRoutes)

server.listen(8000 , () => {
  console.log("running")
})