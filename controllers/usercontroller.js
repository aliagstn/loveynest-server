const { User, Couple, sequelize } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const { cloudinary } = require("../middlewares/cloudinary");
const { Op } = require("sequelize");
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

            if (!email || !password) {
                throw { code: 401 };
            }
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
            console.log(access_token)
            res.status(200).json({
                message: "User logged in successfully",
                data: {
                    id: user.id,
                    nickname: user.nickname,
                    email: user.email,
                    userCode: user.userCode,
                    photoProfile: user.photoProfile,
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
            if (!user) {
                throw { code: 404 };
            }
            res.status(200).json({
                data: user,
            });
        } catch (err) {
            next(err);
        }
    }
    // usefocuseffect
    // update user detail
    static async updateUser(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { nickname, photoProfile } = req.body;
            if (!nickname && !photoProfile) {
                throw { code: 400 };
            }
            const user = await User.findByPk(+id, { transaction: t });

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
                    },
                    { transaction: t }
                );
                await t.commit();
                res.status(200).json({
                    message: "User updated successfully",
                    data: {
                        id: updated[1][0].id,
                        nickname: updated[1][0].nickname,
                        photoProfile: updated[1][0].photoProfile,
                        userCode: updated[1][0].userCode,
                    },
                });
            } else {
                throw { code: 404 };
            }
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    static async inputPartnerCode(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { partnerCode } = req.body;
            if (!partnerCode) {
                throw { code: 400 };
            }
            const user1 = await User.findByPk(id, { transaction: t });

            if (partnerCode === user1.userCode) {
                throw { code: 400 };
            }
            if (!user1.CoupleId) {
                const updatedUser1 = await User.update(
                    {
                        partnerCode,
                    },
                    {
                        where: {
                            id: +id,
                        },
                        returning: true,
                    }
                    // { transaction: t }
                );
                // get the other user
                const user2 = await User.findOne(
                    {
                        where: {
                            userCode: partnerCode,
                        },
                    }
                    // { transaction: t }
                );
                if (user2.partnerCode) {
                    throw { code: 400 };
                }
                // create new couple
                const newCouple = await Couple.create(
                    {
                        UserId1: user1.id,
                        UserId2: user2.id,
                    }
                    // { transaction: t }
                );
                // await t.commit()
                //update coupleid
                const updateCoupleIdUser1 = await User.update(
                    {
                        CoupleId: +newCouple.id,
                    },
                    {
                        where: {
                            id: +id,
                        },
                    }
                    // { transaction: t }
                );

                const updatedUser2 = await User.update(
                    {
                        partnerCode: user1.userCode,
                        CoupleId: +newCouple.id,
                    },
                    {
                        where: {
                            id: +user2.id,
                        },
                    }
                    // { transaction: t }
                );
                await t.commit();

                res.status(201).json({
                    message: "Couple created successfully",
                    data: newCouple,
                });
            } else {
                const user2 = await User.findOne({
                    where: {
                        userCode: partnerCode,
                    },
                });
                res.status(400).json({
                    message: "You already have a partner",
                    partnerData: user2,
                });
            }
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    static async deletePartnerCode(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            // find the user
            const user1 = await User.findByPk(+id, { transaction: t });

            const couple = await Couple.findOne(
                {
                    where: {
                        id: user1.CoupleId,
                    },
                },
                { transaction: t }
            );

            if (!couple) {
                throw { code: 400 };
            }

            const user2 = await User.findOne(
                {
                    where: {
                        CoupleId: couple.id,
                        id: {
                            [Op.not]: +id,
                        },
                    },
                },
                { transaction: t }
            );

            const updatedUser2 = await User.update(
                {
                    partnerCode: null,
                    CoupleId: null,
                },
                {
                    where: {
                        id: user2.id,
                    },
                },
                { transaction: t }
            );

            const updateCoupleIdUser1 = await User.update(
                {
                    CoupleId: null,
                },
                {
                    where: {
                        id: +id,
                    },
                },
                { transaction: t }
            );

            const deleteCouple = await Couple.destroy(
                {
                    where: {
                        id: couple.id,
                    },
                },
                { transaction: t }
            );

            await t.commit();

            res.status(200).json({
                message: "partnerCode deleted successfully",
            });
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    //TAMBAHAN DARI ALIA DARI SINIII
    static async postToCloudinary(req, res, next) {
        try {
            const { img } = await req.body;
            const uploadedResponse = await cloudinary.uploader.upload(img, {
                upload_preset: "ml_default",
            });
            res.status(201).json(uploadedResponse);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = userController;
