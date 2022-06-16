'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [6,12]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user)=>{
    const encryptedPassword =  bcrypt.hashSync(user.password, 9);
    user.password = encryptedPassword;
  })
  return User;
};