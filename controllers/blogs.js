const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (request, response, next) => {
  try {
    request.blog = await Blog.findByPk(request.params.id)
    if (!request.blog) {
      return response.status(404).end()
    }
    next()
  } catch (error) {
    next(error)
  }
}

router.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.findAll()
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const blog = await Blog.create(request.body)
    response.json(blog)
  } catch (error) {
    // return response.status(400).json({ error })
    next(error)
  }
})

router.get('/:id', blogFinder, (request, response, next) => {
  try {
    response.json(request.blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', blogFinder, async (request, response, next) => {
  try {
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