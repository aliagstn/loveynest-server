"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppQuizResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AppQuizResult.init(
    {
      responseUser: DataTypes.STRING,
      QuizId: DataTypes.INTEGER,
      CoupleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AppQuizResult",
    }
  );
  return AppQuizResult;
};
