const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')
const bcrypt = require('bcrypt')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'username must be a valid email address'
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, 
{ 
  sequelize,
  timestamps: true,
  underscored: true, 
  modelName: 'user',
  hooks: {
    beforeCreate: async (user) => {
      const saltRounds = 10
      user.password = await bcrypt.hash(user.password, saltRounds)
    },
    beforeUpdate: async (user) => {
      const saltRounds = 10
      user.password = await bcrypt.hash(user.password, saltRounds)
    }
  } 
}
)

module.exports = User