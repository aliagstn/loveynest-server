'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const quizzes = require('../Data/data-dummy-userQuiz.json').UserQuiz
    quizzes.forEach(quiz => {
      delete quiz.id
      quiz.createdAt = new Date()
      quiz.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('UserQuizzes', quizzes, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UserQuizzes', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
