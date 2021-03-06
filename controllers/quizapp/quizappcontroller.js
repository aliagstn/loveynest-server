"use strict";
const {
  Couple,
  User,
  AppQuiz,
  AppQuizResult,
  sequelize,
} = require("../models");
const {Op} = require("sequelize")

class AppQuizControl {
  static async getAppQuiz(req, res, next) {
    try {
      const quizList = await AppQuiz.findAll();
      res.status(200).json(quizList);
    } catch (err) {
      next(err);
    }
  }

  static async createResult(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const QuizId = 1;
      const { responseUser, UserId, CoupleId } = req.body;
        console.log(req.body)
      const user = await User.findByPk(UserId, { transaction: t });

      if (!user) {
        throw { code: 404 };
      }

      const couple = await Couple.findByPk(CoupleId, { transaction: t });

      if (!couple) {
        throw { code: 404 };
      }

      if (couple.UserId1 === +UserId || couple.UserId2 === +UserId) {
        let newResult = { responseUser, QuizId, UserId, CoupleId };
        const resultQuiz = await AppQuizResult.create(newResult, {
          transaction: t,
        });
        await t.commit();
        res.status(201).json(resultQuiz);
      } else {
        throw { code: 403 };
      }
    } catch (err) {
      await t.rollback();

      next(err);
    }
  }

  static async getResult(req, res, next) {
    try {
      const resultList = await AppQuizResult.findAll({
        include: [Couple],
        order: [["id", "ASC"]],
      });

      res.status(200).json(resultList);
    } catch (err) {
      next(err);
    }
  }

  static async getResultByUser(req, res, next) {
    try {
      const userId = +req.params.id;

      const user = await User.findOne({
        where: {
          id: +userId,
        },
      });
      if (!user) {
        throw { code: 404 };
      }

      const coupleId = user.CoupleId;

      const couple = await Couple.findOne({
        where: {
          id: coupleId,
        },
      });

      let idPartner;
      coupleId.UserId === userId
        ? (idPartner = couple.UserId2)
        : (idPartner = couple.UserId1);

      const resultByIdList = await AppQuizResult.findAll({
        include: [AppQuiz, { model: Couple, include: [User] }],
        where: {
          CoupleId: coupleId,
          UserId: {
            [Op.or]: [userId, idPartner],
          },
        },
        // order: [["id", "DESC"]],
      });

      res.status(200).json(resultByIdList);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = AppQuizControl;