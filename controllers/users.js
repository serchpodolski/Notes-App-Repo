const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

const userFinder = async (request, response, next) => {
  try {
    request.user = await User.findByPk(request.params.username, {
      include: {
        model: Blog,
      }
    })
    if (!request.user) {
      return response.status(404).end()
    }
    next()
  } catch (error) {
    next(error)
  }
}

router.get('/', async (request, response, next) => {
  try {
    const users = await User.findAll(
      {
      include: {
        model: Blog,
        attributes: {
          exclude: ['userId']
        }
      }
    }
  )
    response.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const user = await User.create(request.body)
    response.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (request, response, next) => {
  try {
    const [rowsUpdated, updatedUsers] = await User.update(request.body, 
      { 
        where: { username: request.params.username },
        returning: true,
        individualHooks: true
      })
    
    if (rowsUpdated === 0) {
      return response.status(404).json({ error: 'user not found' })
    }
    
    const user = updatedUsers[0]
    response.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', userFinder, async (request, response, next) => {
  try {
    // const user = await User.findByPk(request.params.id)
    if (!request.user) {
      return response.status(404).json({ error: 'user not found' })
    } else {
      response.json(request.user)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router

