"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Couple extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Couple.hasMany(models.User, { foreignKey: "CoupleId" });
        }
    }
    Couple.init(
        {
            UserId1: DataTypes.INTEGER,
            UserId2: DataTypes.INTEGER,
            anniversaryDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Couple",
        }
    );
    return Couple;
};
