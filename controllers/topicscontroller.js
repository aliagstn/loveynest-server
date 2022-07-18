const { Topic, CoupleTopic, TopicCategory } = require("../models");

class TopicController {
    static async getAllTopics(req, res, next) {
        try {
            const coupleTopics = await CoupleTopic.findAll({
                where: { CoupleId: req.user.CoupleId },
            });

            const coupleTopicsId = coupleTopics.map((coupleTopic) => coupleTopic.TopicId);

            const topics = await Topic.findAll();
            const topicsId = topics.map((topic) => topic.id);

            let randomTopics = topicsId.filter((topic) => !coupleTopicsId.includes(topic));

            let threeTopics = [];
            for (let i = 0; i < 3; i++) {
                let random = Math.floor(Math.random() * randomTopics.length);
                threeTopics.push(randomTopics[random]);
                randomTopics.splice(random, 1);
            }

            const threeRandomTopics = await Topic.findAll({
                where: { id: threeTopics },
            });

            res.status(200).json(threeRandomTopics);
        } catch (err) {
            next(err);
        }
    }

    static async allCoupleTopics(req, res, next) {
        try {
            const coupleTopics = await CoupleTopic.findAll();

            res.status(200).json(coupleTopics);
        } catch (err) {
            next(err);
        }
    }

    static async getAllCategory(req, res, next) {
        try {
            const categories = await TopicCategory.findAll();

            res.status(200).json(categories);
        } catch (err) {
            next(err);
        }
    }

    static async addTopic(req, res, next) {
        try {
            const { name, TopicCategoryId } = req.body;

            const newTopic = await Topic.create({
                name,
                TopicCategoryId,
            });

            res.status(201).json(newTopic);
        } catch (err) {
            next(err);
        }
    }

    static async addCoupleTopics(req, res, next) {
        try {
            const { status, TopicId } = req.body;
            const { CoupleId } = req.user;

            const newCoupleTopic = await CoupleTopic.create({
                status,
                TopicId,
                CoupleId,
            });

            res.status(201).json(newCoupleTopic);
        } catch (err) {
            next(err);
        }
    }

    static async addCategory(req, res, next) {
        try {
            const { topicCategory } = req.body;

            const newCategory = await TopicCategory.create({
                topicCategory,
            });

            res.status(201).json(newCategory);
        } catch (err) {
            next(err);
        }
    }

    static async getTopicById(req, res, next) {
        try {
            const { id } = req.params;

            const topic = await Topic.findByPk(id);

            res.status(200).json(topic);
        } catch (err) {
            next(err);
        }
    }

    static async getCoupleTopicById(req, res) {
        try {
            const { id } = req.params;

            const coupleTopic = await CoupleTopic.findByPk(id);

            res.status(200).json(coupleTopic);
        } catch (err) {
            next(err);
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const { id } = req.params;

            const category = await TopicCategory.findByPk(id);

            res.status(200).json(category);
        } catch (err) {
            next(err);
        }
    }

    static async updateTopic(req, res, next) {
        try {
            const { id } = req.params;
            const { name, TopicCategoryId } = req.body;

            const updatedTopic = await Topic.update(
                {
                    name,
                    TopicCategoryId,
                },
                {
                    where: { id },
                }
            );

            res.status(200).json(updatedTopic);
        } catch (err) {
            next(err);
        }
    }

    static async updateCoupleTopic(req, res, next) {
        try {
            const { id } = req.params;
            const { status, TopicId } = req.body;
            const { CoupleId } = req.user;

            const updatedCoupleTopic = await CoupleTopic.update(
                {
                    status,
                    TopicId,
                    CoupleId,
                },
                {
                    where: { id },
                }
            );

            res.status(200).json(updatedCoupleTopic);
        } catch (err) {
            next(err);
        }
    }

    static async updateCategory(req, res, next) {
        try {
            const { id } = req.params;
            const { topicCategory } = req.body;

            const updatedCategory = await TopicCategory.update(
                {
                    topicCategory,
                },
                {
                    where: { id },
                }
            );

            res.status(200).json(updatedCategory);
        } catch (err) {
            next(err);
        }
    }

    static async deleteTopic(req, res, next) {
        try {
            const { id } = req.params;

            const deletedTopic = await Topic.destroy({
                where: { id },
            });

            res.status(200).json(deletedTopic);
        } catch (err) {
            next(err);
        }
    }

    static async deleteCoupleTopic(req, res, next) {
        try {
            const { id } = req.params;

            const deletedCoupleTopic = await CoupleTopic.destroy({
                where: { id },
            });

            res.status(200).json({
                message: "CoupleTopic deleted successfully",
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;

            const deletedCategory = await TopicCategory.destroy({
                where: { id },
            });

            res.status(200).json({
                message: "Category deleted successfully",
            });
        } catch (err) {
            console.log(next);
        }
    }
}

module.exports = TopicController;
