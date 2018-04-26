const { Comment } = require("../models");

exports.updateCommentVoteCount = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  Comment.findByIdAndUpdate(id, { $inc: { votes: swing } }, { new: true })
    .then(comment => res.status(200).send({ comment }))
    .catch(err => next(err));
};

exports.deleteCommentById = (req, res, next) => {
  const id = req.params.comment_id;
  Comment.findById(id)
    .then(comment => comment.remove())
    .then(comment => {
      console.log(comment);
      res.send({
        id,
        message: "comment deleted"
      });
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};
