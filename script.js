const express = require("express")
const tasksRoutes = require("./routes/tasks")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const server = express()

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB is connected"))
  .catch(() => console.log("error"))

server.use(express.json())
server.use((req, res,next) => {
  const error = new Error()
  error.message = "Not Found"
  error.status = 404
  res.status(error.status).json({error: error})
})

server.use("/api/tasks", tasksRoutes)

server.listen(8000 , () => {
  console.log("running")
})