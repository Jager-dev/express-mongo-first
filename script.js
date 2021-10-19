const express = require("express")
const fs = require("fs")
const tasksRoutes = require("./routes/tasks")

const server = express()
server.use(express.json())
server.use((req, res,next) => {
  console.log("I am middleware :)")
})

server.use("/api/tasks", tasksRoutes)

server.listen(8000 , () => {
  console.log("running")
})