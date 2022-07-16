"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserQuiz extends Model {

        static associate(models) {
            // define association here
            UserQuiz.belongsTo(models.QuizCategory, { foreignKey: "QuizCategoryId" })
            UserQuiz.hasMany(models.UserQuestion, { foreignKey: "QuizId" })
        }
    }
    UserQuiz.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Tittle is required"
                    },
                    notEmpty: {
                        msg: "Tittle is required"
                    }
                }
            },
            status: DataTypes.STRING,
            totalPoint: DataTypes.INTEGER,
            AuthorId: DataTypes.INTEGER,
            CoupleId: DataTypes.INTEGER,
            QuizCategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "UserQuiz",
        }
    );
    return UserQuiz;
};
