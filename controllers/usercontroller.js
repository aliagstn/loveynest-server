const { User, Couple, sequelize } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { convertPayloadToToken } = require('../helpers/jwt')
const {cloudinary } = require("../middlewares/cloudinary")

class userController {

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        }
      });
      const passwordVerified = comparePassword(password, user.password);
      
      if (!passwordVerified) {
        throw { name: 'userNotFound' }
      }

      const payload = {
        id: user.id
      }

      const access_token = convertPayloadToToken(payload)

      res.status(200).json({
        message: 'User logged in successfully',
        data: {
          id: user.id,
          userCode: user.userCode,
          email: user.email,
          nickname: user.nickname,
          photoProfile: user.photoProfile,
          access_token
        },
      });
    } catch (err) {
        //handle err?
        res.status(400).json(err)
      console.log(err);
    }
  }

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
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });

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

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ['password']
        }
      });

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
      const { nickname, photoProfile } = req.body;

      const user = await User.findByPk(id);

      if (user) {
        const updated = await User.update({
          nickname,
          photoProfile,
        },
          {
            where: {
              id,
            },
            returning: true,
          },
        );

        res.status(200).json({
          message: 'User updated successfully',
          data: {
            id: updated[1][0].id,
            nickname: updated[1][0].nickname,
            photoProfile: updated[1][0].photoProfile,
            userCode: updated[1][0].userCode
          },
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
        console.log(id, partnerCode)
      const user1 = await User.findByPk(id);
      if (!user1.CoupleId) {
        const updatedUser1 = await User.update({
              partnerCode
        }, {
            where: {
                id: +id
            },
            returning: true,
        }, { transaction: t });
        
        console.log(updatedUser1)
        const user2 = await User.findOne({
          where: {
            userCode: partnerCode
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
            partnerCode: user1.userCode,
            CoupleId: newCouple.id
          },
          {
            where: {
              id: user2.id
            }
          })

        await t.commit();
          console.log(newCouple, updatedUser1, updatedUser2, "<><<<<<<<<<<<")
        res.status(201).json({
          message: 'Couple created successfully',
          data: newCouple,
        });
      } else {
        const user2 = await User.findOne({
            where:{
                userCode: partnerCode
            }
        })
        console.log(user2)
        res.status(400).json({
          message: 'You already have a partner'
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deletePartnerCode(req, res) {
    const t = await sequelize.transaction()
    try {
      const { id } = req.params;

      const user1 = await User.findByPk(id);

      const couple = await Couple.findOne({
        where: {
          id: user1.CoupleId
        }
      })

      const updatedUser1 = await User.update({
        partnerCode: null
      }, {
        where: {
          id
        },
        returning: true,
      }, { transaction: t });

      const user2 = await User.findOne({
        where: {
          CoupleId: user1.CoupleId
        }
      })

      const updateCoupleIdUser1 = await User.update(
        {
          CoupleId: null
        },
        {
          where: {
            id,
          }
        })

      const updatedUser2 = await User.update(
        {
          partnerCode: null,
          CoupleId: null
        },
        {
          where: {
            id: user2.id
          }
        })

      const deleteCouple = await Couple.destroy({
        where: {
          id: couple.id
        }
      })

      await t.commit();

      res.status(200).json({
        message: 'partnerCode deleted successfully',
      });
    } catch (err) {
      console.log(err);
    }
  }



  static async deleteCouple(req, res) {
    try {
      const { id } = req.params;

      const couple = await Couple.findByPk(id);

      if (!couple) {
        throw { name: 'coupleNotFound' }
      }

      const deleted = await Couple.destroy({
        where: {
          id
        },
        returning: true,
      });

      res.status(200).json({
        message: 'Couple deleted successfully',
        data: deleted,
      });
    } catch (err) {
      console.log(err);
    }
  }



  //TAMBAHAN DARI ALIA DARI SINIII
  static async postToCloudinary(req, res){
    try {
        const {img} = await req.body
        const uploadedResponse = await cloudinary.uploader.upload(img, {
            upload_preset: 'ml_default'
        })
        res.status(201).json(uploadedResponse)
    } catch (error) {
        res.status(500).json(error)
        console.error();
    }
  }
}

module.exports = userController;