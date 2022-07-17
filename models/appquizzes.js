"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppQuizzes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AppQuizzes.hasMany(models.AppQuizResults, {
        foreignKey: "QuizId",
      });
    }
  }
  AppQuizzes.init(
    {
      question: DataTypes.ARRAY,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AppQuizzes",
    }
  );
  return AppQuizzes;
};
