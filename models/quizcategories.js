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
      QuizCategories.hasMany(models.UserQuizzes, { foreignKey: "QuizCategoryId" })
    }
  }
  QuizCategories.init({
    quizCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quiz category is required"
        },
        notEmpty: {
          msg: "Quiz category is required"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL is required"
        },
        notEmpty: {
          msg: "Image URL is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'QuizCategories',
  });
  return QuizCategories;
};