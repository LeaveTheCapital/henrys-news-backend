const { Topic, Article } = require("../models");

exports.getAllTopics = (req, res, next) => {
  Topic.find()
    .then(topics => res.send({ topics }))
    .catch(err => next(err));
};

exports.getArticlesByTopicId = (req, res, next) => {
  const id = req.params.topic_id;
  Article.find({ belongs_to: id })
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
};

exports.addArticleByTopicID = (req, res, next) => {
  const id = req.params.topic_id;
  new Article(req.body)
    .save()
    .then(article => res.status(201).send({ article }))
    .catch(err => {
      console.log(err);
      return next(err);
    });
};
