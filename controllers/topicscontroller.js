const { Topic, CoupleTopic, TopicCategory, sequelize } = require("../models");

class TopicController {
    static async getAllTopics(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const coupleTopics = await CoupleTopic.findAll(
                {
                    where: { CoupleId: req.user.CoupleId },
                },
                // { transaction: t }
            );
                console.log(coupleTopics)
            const coupleTopicsId = coupleTopics.map((coupleTopic) => coupleTopic.TopicId);

            const topics = await Topic.findAll({ transaction: t });
            const topicsId = topics.map((topic) => topic.id);

            let filteredTopics = topicsId.filter((topic) => !coupleTopicsId.includes(topic));

            let threeTopics = [];
            for (let i = 0; i < 3; i++) {
                let random = Math.floor(Math.random() * filteredTopics.length);

                threeTopics.push(filteredTopics[random]);
                filteredTopics.splice(random, 1);
            }

            const threeRandomTopics = await Topic.findAll(
                {
                    where: { id: threeTopics },
                    include: TopicCategory
                },
                // { transaction: t },
            );
            // console.log(threeRandomTopics)
            await t.commit();
            res.status(200).json(threeRandomTopics);
        } catch (err) {
            console.log(err)
            await t.rollback();
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
            console.log(status, TopicId, CoupleId)
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
                    where: { id: +id },
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
                    TopicId: +TopicId,
                    CoupleId: +CoupleId,
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
                    where: { id: +id },
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
                where: { id: +id },
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
                where: { id: +id },
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
                where: { id: +id },
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
