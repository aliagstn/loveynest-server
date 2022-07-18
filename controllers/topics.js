const { Topic, CoupleTopic, TopicCategory } = require('../models');

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

  static async getAllCategory(req, res) {
    try {
      const categories = await TopicCategory.findAll();

      res.status(200).json({
        message: 'Category retrieved successfully',
        data: categories,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async addTopic(req, res) {
    try {
      const { name, TopicCategoryId } = req.body;

      const newTopic = await Topic.create({
        name,
        TopicCategoryId,
      });

      res.status(201).json({
        message: 'Topic created successfully',
        data: newTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async addCoupleTopics(req, res) {
    try {
      const { status, TopicId } = req.body;
      const { CoupleId } = req.user

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

  static async addCategory(req, res) {
    try {
      const { topicCategory } = req.body;

      const newCategory = await TopicCategory.create({
        topicCategory,
      });

      res.status(201).json({
        message: 'Category created successfully',
        data: newCategory,
      });
    } catch (err) {

    }
  }

  static async getTopicById(req, res) {
    try {
      const { id } = req.params;

      const topic = await Topic.findByPk(id);

      res.status(200).json({
        message: 'Topic retrieved successfully',
        data: topic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getCoupleTopicById(req, res) {
    try {
      const { id } = req.params;

      const coupleTopic = await CoupleTopic.findByPk(id);

      res.status(200).json({
        message: 'CoupleTopic retrieved successfully',
        data: coupleTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await TopicCategory.findByPk(id);

      res.status(200).json({
        message: 'Category retrieved successfully',
        data: category,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateTopic(req, res) {
    try {
      const { id } = req.params;
      const { name, TopicCategoryId } = req.body;

      const updatedTopic = await Topic.update({
        name,
        TopicCategoryId,
      }, {
        where: { id },
      });

      res.status(200).json({
        message: 'Topic updated successfully',
        data: updatedTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateCoupleTopic(req, res) {
    try {
      const { id } = req.params;
      const { status, TopicId } = req.body;
      const { CoupleId } = req.user

      const updatedCoupleTopic = await CoupleTopic.update({
        status,
        TopicId,
        CoupleId
      }, {
        where: { id },
      });

      res.status(200).json({
        message: 'CoupleTopic updated successfully',
        data: updatedCoupleTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { topicCategory } = req.body;

      const updatedCategory = await TopicCategory.update({
        topicCategory,
      }, {
        where: { id },
      });

      res.status(200).json({
        message: 'Category updated successfully',
        data: updatedCategory,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteTopic(req, res) {
    try {
      const { id } = req.params;

      const deletedTopic = await Topic.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'Topic deleted successfully',
        data: deletedTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCoupleTopic(req, res) {
    try {
      const { id } = req.params;

      const deletedCoupleTopic = await CoupleTopic.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'CoupleTopic deleted successfully',
        data: deletedCoupleTopic,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const deletedCategory = await TopicCategory.destroy({
        where: { id },
      });

      res.status(200).json({
        message: 'Category deleted successfully',
        data: deletedCategory,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = topicController;