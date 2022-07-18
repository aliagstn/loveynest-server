"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserQuizzes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            totalPoint: {
                type: Sequelize.INTEGER,
            },
            AuthorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            CoupleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Couples",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
            },
            QuizCategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "QuizCategories",
                    key: "id",
                },
                onUpdate: "cascade",
                onDelete: "cascade",
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
        await queryInterface.dropTable("userQuizzes");
    },
};
