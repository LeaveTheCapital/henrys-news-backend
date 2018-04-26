const { Comment } = require("../models");

exports.updateCommentVoteCount = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.query.vote;
  const swing = vote === "up" ? 1 : vote === "down" ? -1 : 0;
  Comment.findByIdAndUpdate(id, { $inc: { votes: swing } }, { new: true })
    .then(comment => res.status(201).send({ comment }))
    .catch(err => next(err));
};
