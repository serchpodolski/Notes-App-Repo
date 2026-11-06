const router = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

const blogFinder = async (request, response, next) => {
  try {
    request.blog = await Blog.findByPk(request.params.id, {
      include: {
        model: User,
        attributes: ['name']
      }
    })
    if (!request.blog) {
      return response.status(404).end()
    }
    next()
  } catch (error) {
    next(error)
  }
}

router.get('/', async (request, response, next) => {
  const where = {}

  if (request.query.search) {
    where.title = { [Op.iLike]: `%${request.query.search}%` }
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ['userId'] },
      include: {
        model: User,
        attributes: ['name']
      },
      where
    })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', tokenExtractor, async (request, response, next) => {
  try {
    const user = await User.findByPk(request.decodedToken.id)
    const blog = await Blog.create({ ...request.body, userId: user.id })
    response.json(blog)
  } catch (error) {
    // return response.status(400).json({ error })
    next(error)
  }
})

router.get('/:id', blogFinder, (request, response, next) => {
  try {
    if (!request.blog) {
      return response.status(404).end()
    } else {
      response.json(request.blog)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id',tokenExtractor, blogFinder, async (request, response, next) => {
  try {
    const user = await User.findByPk(request.decodedToken.id)
    if (user.id !== request.blog.userId) {
      return response.status(401).json({ error: 'unauthorized' })
    }
    await request.blog.destroy()
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (request, response, next) => {
  try {
    request.blog.likes = request.body.likes
    await request.blog.save()
    response.json(request.blog)
  } catch (error) {
    next(error)
  }
})

module.exports = router