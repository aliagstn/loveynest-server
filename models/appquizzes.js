'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppQuiz.init({
    question: DataTypes.ARRAY(DataTypes.STRING),
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppQuiz',
  });
  return AppQuiz;
};