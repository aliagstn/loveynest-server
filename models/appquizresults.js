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
                type: DataTypes.ARRAY(DataTypes.BOOLEAN),
                validate: {
                    customValidator() {
                        if (Array.isArray(this.responseUser) === false) {
                            throw new Error("Response User must be an array");
                        }
                        if (this.responseUser.length !== 7) {
                            throw new Error("All questions must be answered");
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
