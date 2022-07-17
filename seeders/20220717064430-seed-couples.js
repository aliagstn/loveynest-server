"use strict";

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
    const couple = require("../data/couples.json");
    couple.forEach((el) => {
      el.anniversaryDate = el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Couples", couple, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Couples", null, {});
  },
};
