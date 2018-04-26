const { Article } = require("../models");

exports.updateCommentCount = (req, res, next) => {
  Article.update()
    .then(article => res.send({ article }))
    .catch(err => next(err));
};
