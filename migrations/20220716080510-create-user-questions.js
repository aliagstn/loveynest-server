"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserQuestions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            answer: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            responsePartner: {
                type: Sequelize.STRING,
            },
            valuePartner: {
                type: Sequelize.BOOLEAN,
            },
            QuizId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "UserQuizzes",
                    key: "id",
                },
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
        await queryInterface.dropTable("UserQuestions");
    },
};
