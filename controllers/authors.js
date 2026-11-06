const router = require('express').Router()
const { Blog } = require('../models')
const { fn, col } = require('sequelize')

router.get('/', async (request, response, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [fn('COUNT', col('id')), 'blogs'],
        [fn('SUM', col('likes')), 'likes']
      ],
      group: ['author'],
      order: [['likes', 'DESC']]
    })

    response.json(authors)
  } catch (error) {
    next(error)
  }
})

module.exports = router