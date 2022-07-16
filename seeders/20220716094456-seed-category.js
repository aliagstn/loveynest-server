'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const categories = require('../Data/data-dummy-userQuiz.json').QuizCategories
    categories.forEach(category => {
      delete category.id
      category.createdAt = new Date()
      category.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('QuizCategories', categories, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('QuizCategories', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
