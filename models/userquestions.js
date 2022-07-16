'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userQuestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userQuestions.belongsTo(models.UserQuizzes, { foreignKey: "QuizId" })
    }
  }
  userQuestions.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    responsePartner: DataTypes.STRING,
    valuePartner: DataTypes.BOOLEAN,
    QuizId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userQuestions',
  });
  return userQuestions;
};