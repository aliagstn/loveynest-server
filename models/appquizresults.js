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
            AppQuizResult.belongsTo(models.AppQuiz, {
                foreignKey: "QuizId",
            });
            AppQuizResult.belongsTo(models.Couple, {
                foreignKey: "CoupleId",
            });
        }
    }
    AppQuizResult.init(
        {
            responseUser: {
                allowNull: false,
                type: DataTypes.ARRAY(DataTypes.BOOLEAN),
                validate: {
                    notEmpty: { msg: "responseUser cannot be empty" },
                    notNull: { msg: "responseUser cannot be empty" },
                    customValidator(responseUser) {
                        if (responseUser) {
                            throw { code: 400 };
                        }
                        if (Array.isArray(responseUser) === false) {
                            throw { msg: "Response User must be an array" };
                        }
                        if (responseUser.length !== 7) {
                            throw { msg: "You must answer all the questions." };
                        }
                    },
                },
            },
            QuizId: DataTypes.INTEGER,
            UserId: DataTypes.INTEGER,
            CoupleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "AppQuizResult",
        }
    );
    return AppQuizResult;
};
