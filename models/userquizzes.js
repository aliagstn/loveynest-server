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
            UserQuizzes.belongsTo(models.QuizCategories, { foreignKey: "QuizCategoryId" })
            UserQuizzes.hasMany(models.userQuestions, { foreignKey: "QuizId" })
        }
    }
    UserQuizzes.init(
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
