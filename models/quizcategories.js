'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  QuizCategories.init({
    quizCategory: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuizCategories',
  });
  return QuizCategories;
};