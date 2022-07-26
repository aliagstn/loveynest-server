'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const questions = require('../Data/data-dummy-userQuiz.json').UserQuestion
    questions.forEach(question => {
      question.createdAt = new Date()
      question.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('UserQuestions', questions, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UserQuestions', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
