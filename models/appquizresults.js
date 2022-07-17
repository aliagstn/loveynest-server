"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppQuizResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AppQuizResults.belongsTo(models.AppQuizzes, {
        foreignKey: "QuizId",
      });
      AppQuizResults.belongsTo(models.Couples, {
        foreignKey: "CoupleId",
      });
    }
  }
  AppQuizResults.init(
    {
      responseUser: DataTypes.STRING,
      QuizId: DataTypes.INTEGER,
      CoupleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AppQuizResults",
    }
  );
  return AppQuizResults;
};
