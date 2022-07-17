"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const couple = require("../data/couples.json");
    couple.forEach((el) => {
      el.anniversaryDate = el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Couples", couple, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Couples", null, {});
  },
};
