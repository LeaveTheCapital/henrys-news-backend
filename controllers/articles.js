const { Article } = require("../models");
const { Comment } = require("../models");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    // TODO: populate on user here
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
};

exports.getArticleById = (req, res, next) => {
  const id = req.params.article_id;
  Article.findById(id)
    .then(article => res.send({ article }))
    .catch(err => {
      return next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  Comment.find({ belongs_to: id })
    .then(comments => res.send({ comments }))
    .catch(err => {
      return next(err);
    });
};

exports.updateArticleVoteCount = (req, res, next) => {
  const id = req.params.article_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  Article.findByIdAndUpdate(id, { $inc: { votes: swing } }, { new: true })
    .then(article => res.status(201).send({ article }))
    .catch(err => next(err));
};
