const { Article } = require("../models");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => res.send({ articles }))
    .catch(err => next(err));
};
