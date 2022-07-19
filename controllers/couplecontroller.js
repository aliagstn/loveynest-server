"use strict";
const { Couple, User } = require("../models");
class CoupleController {
    static async getAllCouples(req, res, next) {
        try {
            const couples = await Couple.findAll();

            res.status(200).json(couples);
        } catch (err) {
            next(err);
        }
    }
    static async getCoupleById(req, res, next) {
        try {
            const { id } = req.params;

            const couple = await Couple.findOne({
                where: {
                    id,
                },
                include: {
                    model: User,
                    attributes: {
                        exclude: ["password"],
                    },
                },
            });

            if (!couple) {
                throw { code: 404 };
            }

            res.status(200).json(couple);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CoupleController;
