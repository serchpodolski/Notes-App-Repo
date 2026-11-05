require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

// class Blog extends Model {}

// Blog.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   author: {
//     type: DataTypes.STRING,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     defaultValue: 0
//   }
// }, 
//   { 
//     sequelize,
//     timestamps: false,
//     underscored: true, 
//     modelName: 'blog' 
//   }
// )

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// app.get('/', async (req, res) => {
//   const blogs = await Blog.findAll()
//   blogs.forEach(blog => {
//     const outputString = `${blog.author}: '${blog.title}', ${blog.likes} likes`
//     console.log(outputString)
//   })
//   res.send('Hello World!')
// })

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: sequelize.QueryTypes.SELECT })
    blogs.forEach(blog => {
      const outputString = `${blog.author}: '${blog.title}', ${blog.likes} likes`
      console.log(outputString)
    })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()
// app.use(express.json())