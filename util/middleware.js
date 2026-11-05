const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map(err => err.message)
    return response.status(400).json({ error: messages })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: 'database error' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      request.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' })
    }
  } else {
    return response.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler, tokenExtractor
}