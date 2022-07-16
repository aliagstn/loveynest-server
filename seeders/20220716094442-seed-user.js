'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const users = require('../data/data-dummy-user.json').Users
    users.forEach(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
