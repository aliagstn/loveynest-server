const { Couple, User } = require('../models');

class coupleController {
  static async getAllCouples(req, res) {
    try {
      const couples = await Couple.findAll();

      res.status(200).json({
        message: 'Couples retrieved successfully',
        data: couples,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getCoupleById(req, res) {
    try {
      const { id } = req.params;

      const couple = await Couple.findOne({
        where: {
          id
        },
        include: {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      });

      res.status(200).json({
        message: 'Couple retrieved successfully',
        data: couple,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = coupleController;
