"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Topics", {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
          },
          TopicCategoryId: {
            type: Sequelize.INTEGER,
            references: { model: "TopicCategories", key: "id" },
            onUpdate: 'cascade',
            onDelete: 'cascade',
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
        await queryInterface.dropTable("Topics");
      },
};
