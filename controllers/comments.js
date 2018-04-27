const { Comment } = require("../models");

exports.updateCommentVoteCount = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  if (swing === 0) {
    throw { status: 400, message: "invalid query. could not update votes" };
  }
  Comment.findByIdAndUpdate(id, { $inc: { votes: swing } }, { new: true })
    .then(comment => res.status(200).send({ comment }))
    .catch(err => {
      if (!err.status) err.status = 400;
      if (!err.message) err.message = "could not update votes";
      return next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const id = req.params.comment_id;
  Comment.findById(id)
    .then(comment => comment.remove())
    .then(comment => {
      res.send({
        id,
        message: "comment deleted"
      });
    })
    .catch(err => {
      return next({ status: 400, message: "could not delete comment" });
    });
};
