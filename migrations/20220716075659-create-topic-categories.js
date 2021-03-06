"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("TopicCategories", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            topicCategory: {
                type: Sequelize.STRING,
            },
            imgTopic: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("TopicCategories");
    },
};
