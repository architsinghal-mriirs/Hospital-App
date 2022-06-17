'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'userId'
      });

      this.belongsToMany(models.Symptoms,{
        through: 'Health_Symptoms',
        foreignKey: 'recordId',
        otherKey: 'symptomId'
      })
    }
  }
  HealthRecord.init({
    patientId: DataTypes.INTEGER,
    symptoms: DataTypes.INTEGER,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HealthRecord',
  });
  return HealthRecord;
};