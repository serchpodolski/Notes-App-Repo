const express = require('express')
const app = express()
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { syncModels } = require('./models/index')

const middleware = require('./util/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const start = async () => {
  await connectToDatabase()
  await syncModels()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

app.use(middleware.errorHandler)

start()