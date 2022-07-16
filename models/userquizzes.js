"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserQuizzes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserQuizzes.init(
        {
            title: DataTypes.STRING,
            status: DataTypes.STRING,
            totalPoint: DataTypes.STRING,
            AuthorId: DataTypes.INTEGER,
            CoupleId: DataTypes.INTEGER,
            QuizCategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "userQuizzes",
        }
    );
    return UserQuizzes;
};
