
const { User, Couple, sequelize } = require('../models');

class userController {

  static async addUser(req, res) {
    try {
      const { nickname, email, password, userCode, partnerCode, photoProfile } = req.body;

      const newUser = await User.create({
        nickname,
        email,
        password,
        userCode,
        partnerCode,
        photoProfile
      });

      res.status(201).json({
        message: 'User created successfully',
        data: newUser,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();

      res.status(200).json({
        message: 'Users retrieved successfully',
        data: users,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      res.status(200).json({
        message: 'User retrieved successfully',
        data: user,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nickname, email, password, photoProfile } = req.body;

      const user = await User.findByPk(id);

      if (user) {
        const updated = await User.update({
          nickname,
          email,
          password,
          photoProfile
        },
          {
            where: {
              id
            },
            returning: true,
          }
        );

        res.status(200).json({
          message: 'User updated successfully',
          data: updated,
        });
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async inputPartnerCode(req, res) {
    const t = await sequelize.transaction()
    try {
      const { id } = req.params;
      const { partnerCode } = req.body;

      const user1 = await User.findByPk(id);

      if (!user1.CoupleId) {
        const updatedUser1 = await User.update({
          partnerCode
        }, {
          where: {
            id
          },
          returning: true,
        }, { transaction: t });

        const user2 = await User.findOne({
          where: {
            userCode: user1.partnerCode
          }
        })

        const newCouple = await Couple.create({
          UserId1: user1.id,
          UserId2: user2.id
        })

        const updateCoupleIdUser1 = await User.update(
          {
            CoupleId: newCouple.id
          },
          {
            where: {
              id,
            }
          })

        const updatedUser2 = await User.update(
          {
            partnerCode: user1.partnerCode,
            CoupleId: newCouple.id
          },
          {
            where: {
              id: user2.id
            }
          })

        await t.commit();

        res.status(201).json({
          message: 'Couple created successfully',
          data: newCouple,
        });
      } else {
        res.status(400).json({
          message: 'You already have a partner'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (user) {
        const deleted = await User.destroy({
          where: {
            id
          }
        });

        res.status(200).json({
          message: 'User deleted successfully',
          data: deleted,
        });
      } else {
        res.status(404).json({
          message: 'User not found',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = userController;
