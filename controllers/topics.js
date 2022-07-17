const { Topic, CoupleTopic } = require('../models');

class topicController {
  static async getAllTopics(req, res) {
    try {
      const topics = await Topic.findAll();

      res.status(200).json({
        message: 'Topics retrieved successfully',
        data: topics,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async allCoupleTopics(req, res) {
    try {
      const coupleTopics = await CoupleTopic.findAll();

      res.status(200).json({
        message: 'CoupleTopics retrieved successfully',
        data: coupleTopics,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async addCoupleTopics(req, res) {
    try {
      const { status, TopicId, CoupleId } = req.body;

      const newCoupleTopic = await CoupleTopic.create({
        status,
        TopicId,
        CoupleId,
      });

      res.status(201).json({
        message: 'CoupleTopic created successfully',
        data: newCoupleTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = topicController;