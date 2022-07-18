const { User, Couple, sequelize } = require("../models");
const { convertPayloadToToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");

class userController {
    static async addUser(req, res, next) {
        try {
            const { nickname, email, password, userCode, partnerCode, photoProfile } = req.body;

            const newUser = await User.create({
                nickname,
                email,
                password,
                userCode,
                partnerCode,
                photoProfile,
            });

            res.status(201).json({
                message: "User created successfully",
                data: {
                    id: newUser.id,
                    nickname: newUser.nickname,
                    email: newUser.email,
                    usercode: newUser.userCode,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if (!user) {
                throw { code: 401 };
            }
            const passwordVerified = comparePassword(password, user.password);

            if (!passwordVerified) {
                throw { code: 401 };
            }

            const payload = {
                id: user.id,
            };

            const access_token = convertPayloadToToken(payload);

            res.status(200).json({
                message: "User logged in successfully",
                data: {
                    nickname: user.nickname,
                    email: user.email,
                    access_token,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ["password"],
                },
            });

            res.status(200).json(users);
        } catch (err) {
            next(err);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ["password"],
                },
            });

            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    // update user detail
    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { nickname, photoProfile } = req.body;

            const user = await User.findByPk(id);

            if (user) {
                const updated = await User.update(
                    {
                        nickname,
                        photoProfile,
                    },
                    {
                        where: {
                            id,
                        },
                        returning: true,
                    }
                );

                res.status(200).json({
                    message: "User updated successfully",
                    data: updated,
                });
            } else {
                throw { code: 404 };
            }
        } catch (err) {
            next(err);
        }
    }

    static async inputPartnerCode(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { partnerCode } = req.body;

            const user1 = await User.findByPk(id, { transaction: t });

            if (partnerCode === user1.userCode) {
                throw { code: 404 };
            }
            if (user1.coupleId) {
                throw { code: 404 };
            }

            // insert partner code
            if (!user1.CoupleId) {
                const updatedUser1 = await User.update(
                    {
                        partnerCode,
                    },
                    {
                        where: {
                            id,
                        },
                        returning: true,
                    },
                    { transaction: t }
                );

                // get the other user
                const user2 = await User.findOne(
                    {
                        where: {
                            userCode: user1.partnerCode,
                        },
                    },
                    { transaction: t }
                );

                // create new couple
                const newCouple = await Couple.create(
                    {
                        UserId1: user1.id,
                        UserId2: user2.id,
                    },
                    { transaction: t }
                );

                //update coupleid
                const updateCoupleIdUser1 = await User.update(
                    {
                        CoupleId: newCouple.id,
                    },
                    {
                        where: {
                            id,
                        },
                    },
                    { transaction: t }
                );

                const updatedUser2 = await User.update(
                    {
                        partnerCode: user1.partnerCode,
                        CoupleId: newCouple.id,
                    },
                    {
                        where: {
                            id: user2.id,
                        },
                    },
                    { transaction: t }
                );

                await t.commit();

                res.status(201).json({
                    message: "Couple created successfully",
                    data: newCouple,
                });
            } else {
                res.status(400).json({
                    message: "You already have a partner",
                });
            }
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (user) {
                const deleted = await User.destroy({
                    where: {
                        id,
                    },
                });

                res.status(200).json({
                    message: "User deleted successfully",
                    data: deleted,
                });
            } else {
                res.status(404).json({
                    message: "User not found",
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = userController;
