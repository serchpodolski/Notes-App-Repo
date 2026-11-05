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

module.exports = {
  errorHandler
}