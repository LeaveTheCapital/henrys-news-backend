const { Article } = require("../models");
const { Comment } = require("../models");
const { generateCount } = require("../utils");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate({ path: "created_by", select: "username name avatar_url" })
    .then(articles => {
      const articleComments = generateCount(articles, Comment);
      return Promise.all([articles, ...articleComments]);
    })
    .then(([articles, ...articleComments]) => {
      const newArticles = articles.map((article, i) => {
        const newArticle = article.toObject();
        newArticle.comment_count = articleComments[i];
        return newArticle;
      });
      return res.send({ articles: newArticles });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
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
    .then(article => res.status(200).send({ article }))
    .catch(err => next(err));
};

exports.addCommentByArticleId = (req, res, next) => {
  const id = req.params.article_id;
  new Comment(req.body)
    .save()
    .then(comment => res.status(201).send({ comment }))
    .catch(err => {
      console.log(err);
      return next(err);
    });
};
