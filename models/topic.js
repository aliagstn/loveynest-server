"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Topic.belongsTo(models.TopicCategory, {foreignKey:"TopicCategoryId"})
        }
    }
    Topic.init(
        {
            name: DataTypes.STRING,
            TopicCategoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Topic",
        }
    );
    return Topic;
};
