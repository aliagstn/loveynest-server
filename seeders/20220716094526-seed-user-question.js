'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const questions = require('../Data/data-dummy-userQuiz.json').UserQuestion
    questions.forEach(question => {
      question.createdAt = new Date()
      question.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('userQuestions', questions, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('userQuestions', null, {
      restartIdentity: true
    });
  }
};
