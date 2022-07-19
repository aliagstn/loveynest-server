'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const topics = require('../db.json');
    topics.topics.forEach(topic => {
      topic.createdAt = new Date();
      topic.updatedAt = new Date();
    })
    await queryInterface.bulkInsert('Topics', topics.topics, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Topics', null, {});
  }
};