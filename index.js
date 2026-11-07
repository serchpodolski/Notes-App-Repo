const express = require('express')
const app = express()
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { syncModels } = require('./models/index')

const middleware = require('./util/middleware')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const resetRouter = require('./controllers/reset')

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)

app.use('/api/reset', resetRouter)

const start = async () => {
  try {
    await connectToDatabase()
    await syncModels()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

app.use(middleware.errorHandler)

start()