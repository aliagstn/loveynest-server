'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TopicCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TopicCategories.init({
    topicCategory: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TopicCategories',
  });
  return TopicCategories;
};