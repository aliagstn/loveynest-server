const { User, Couple, sequelize } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { convertPayloadToToken } = require("../helpers/jwt");
const { cloudinary } = require("../middlewares/cloudinary");
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

            const user = await User.findByPk(id, { transaction: t });

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
            console.log(id, partnerCode, "<<di input parttner code")
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
                            id: +id,
                        },
                        returning: true,
                    },
                    // { transaction: t }
                );
                    console.log(updatedUser1)
                // get the other user
                const user2 = await User.findOne(
                    {
                        where: {
                            userCode: partnerCode,
                        },
                    },
                    // { transaction: t }
                );
                console.log(user2)

                // create new couple
                const newCouple = await Couple.create(
                    {
                        UserId1: user1.id,
                        UserId2: user2.id,
                    },
                    // { transaction: t }
                );
<<<<<<< HEAD
                await t.commit();
=======
                // await t.commit()
                    console.log(newCouple)
>>>>>>> 1caf5fa6bc248a75c994724d36c7bf2ce382efa0
                //update coupleid
                const updateCoupleIdUser1 = await User.update(
                    {
                        CoupleId: +newCouple.id,
                    },
                    {
                        where: {
                            id: +id,
                        },
                    },
                    // { transaction: t }
                );
                    console.log(updateCoupleIdUser1)
                const updatedUser2 = await User.update(
                    {
                        partnerCode: user1.userCode,
<<<<<<< HEAD
                        CoupleId: newCouple.id,
=======
                        CoupleId: +newCouple.id,
>>>>>>> 1caf5fa6bc248a75c994724d36c7bf2ce382efa0
                    },
                    {
                        where: {
                            id: +user2.id,
                        },
                    },
                    // { transaction: t }
                );
                    console.log(updatedUser2)
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
            console.log(err)
            await t.rollback();
            next(err);
        }
    }

    static async deletePartnerCode(req, res) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;

            const user1 = await User.findByPk(id);

            const couple = await Couple.findOne({
                where: {
                    id: user1.CoupleId,
                },
            });

            const updatedUser1 = await User.update(
                {
                    partnerCode: null,
                },
                {
                    where: {
                        id,
                    },
                    returning: true,
                },
                { transaction: t }
            );

            const user2 = await User.findOne({
                where: {
                    CoupleId: user1.CoupleId,
                },
            });

            const updateCoupleIdUser1 = await User.update(
                {
                    CoupleId: null,
                },
                {
                    where: {
                        id,
                    },
                }
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
                }
            );

            const deleteCouple = await Couple.destroy({
                where: {
                    id: couple.id,
                },
            });

            await t.commit();

            res.status(200).json({
                message: "partnerCode deleted successfully",
            });
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }

    static async deleteCouple(req, res) {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;

            const couple = await Couple.findByPk(id, { transaction: t });

            if (!couple) {
                throw { name: "coupleNotFound" };
            }

            const deleted = await Couple.destroy(
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
                message: "Couple deleted successfully",
                data: deleted,
            });
        } catch (err) {
            await t.rollback();
        }
    }

    //TAMBAHAN DARI ALIA DARI SINIII
    static async postToCloudinary(req, res) {
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
