"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Couple, { foreignKey: "CoupleId" });
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exists",
        },
      },
      password: DataTypes.STRING,
      userCode: DataTypes.STRING,
      partnerCode: DataTypes.STRING,
      photoProfile: DataTypes.STRING,
      CoupleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (instance) => {
    try {
      const users = await User.findAll()
      const usersCode = users.map((code) => {
        return code.userCode;
      })

      instance.userCode;
      do {
        instance.userCode = 'LV-' + Math.floor(Math.random() * 10000);

      } while (usersCode.indexOf(instance.userCode) !== -1);

      console.log(instance.userCode, '<<<<<<');
    } catch (err) {
      console.log(err);
    }

  })

  // User.afterUpdate(async (instance) => {

  // })

  return User;
};
