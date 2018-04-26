const { Topic, Article } = require("../models");

exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => res.send({ topics }))
    .catch(err => next(err));
};

exports.getArticlesByTopicId = (req, res, next) => {
  const topicId = req.params.topic_id;
  Article.find({ belongs_to: topicId })
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
};
