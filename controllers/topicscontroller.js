const { Topic, CoupleTopic, TopicCategory, sequelize } = require("../models");

class TopicController {
    static async getAllTopics(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const coupleTopics = await CoupleTopic.findAll(
                {
                    where: { CoupleId: req.user.CoupleId },
                }
                // { transaction: t }
            );
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
                    include: TopicCategory,
                }
                // { transaction: t }
            );

            await t.commit();
            res.status(200).json(threeRandomTopics);
        } catch (err) {
            console.log(err);
            await t.rollback();
            next(err);
        }
    }

    static async addCoupleTopics(req, res, next) {
        try {
            const { status, TopicId } = req.body;

            if (status !== true) {
                throw { code: 400 };
            }
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
}
module.exports = TopicController;
