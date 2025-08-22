import express from 'express'
import dotenv from 'dotenv'
import { connectMongoDB } from './config/mongodb.js'
import todoRoute from './routes/createTodo.js'
import userRoute from './routes/userAuth.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectMongoDB()
  app.use(express.json())

  app.get("/ping", (req, res) => {
    res.send("SERVER IS RUNNING")
  })

  app.use('/api/v1/todo', todoRoute)
  
  app.use('/api/v1/user', userRoute)

  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
  })
}

startServer()
