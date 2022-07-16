'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const couples = require('../data/data-dummy-user.json').Couples
    couples.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });

    await queryInterface.bulkInsert('Couples', couples, {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Couples', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    });
  }
};
