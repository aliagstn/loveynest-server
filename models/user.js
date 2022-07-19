"use strict";
const { hash } = require("../helpers/bcrypt");
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
                validate: {
                    isEmail: {
                        msg: "Please use email format",
                    },
                    notEmpty: {
                        msg: "Email is required",
                    },
                    notNull: {
                        msg: "Email is required",
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Password is required",
                    },
                    notNull: {
                        msg: "Password is required",
                    },
                    len: {
                        args: [6],
                        msg: "Password must be at least 6 characters",
                    },
                },
            },
            userCode: DataTypes.STRING,
            partnerCode: DataTypes.STRING,
            photoProfile: DataTypes.STRING,
            CoupleId: DataTypes.INTEGER,
        },
        {
            hooks: {
                async beforeCreate(instance, options) {
                    try {
                        instance.password = hash(instance.password);
                        const users = await User.findAll();
                        const usersCode = users.map((code) => {
                            return code.userCode.split("LV-").join("");
                        });
                        instance.userCode;
                        let random;
                        do {
                            random = Math.floor(Math.random() * Math.pow(10, 4));
                        } while (usersCode.indexOf(instance.userCode) !== -1);
                        random = random.toString();
                        if (random.length === 3) {
                            random = "0" + random;
                        } else if (random.length === 2) {
                            random = "00" + random;
                        } else if (random.length === 1) {
                            random = "000" + random;
                        }
                        instance.userCode = `LV-${random}`;
                    } catch (err) {
                        console.log(err);
                    }
                },
            },
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
