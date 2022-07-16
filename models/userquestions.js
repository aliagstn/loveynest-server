"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserQuestion.belongsTo(models.UserQuiz, { foreignKey: "QuizId" })
    }
  }
  UserQuestion.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      responsePartner: DataTypes.STRING,
      valuePartner: DataTypes.BOOLEAN,
      QuizId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserQuestion",
    }
  );
  return UserQuestion;
};
