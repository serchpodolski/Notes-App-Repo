const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')

router.post('/', async (request, response, next) => {
  try {
    if (process.env.TESTING !== 'true') {
      return response.status(401).json({ error: 'Reset endpoint only available in test mode' })
    }
    await Blog.destroy({ truncate: { cascade: true } })
    await User.destroy({ truncate: { cascade: true } })
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router