"use strict";

const { hash } = require("../helpers/bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = require("../data/users.json");
        users.forEach((el) => {
            el.password = hash(el.password);
            el.createdAt = el.updatedAt = new Date();
        });
        await queryInterface.bulkInsert("Users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
