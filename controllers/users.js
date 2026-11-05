const router = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

router.get('/', async (request, response) => {
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
})

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body)
    response.json(user)
  } catch (error) {
    return response.status(400).json({ error })
  }
})

router.put('/:username', async (request, response) => {
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
    return response.status(400).json({ error })
  }
})

router.get('/:id', async (request, response) => {
  const user = await User.findByPk(request.params.id)
  response.json(user)
})

module.exports = router

