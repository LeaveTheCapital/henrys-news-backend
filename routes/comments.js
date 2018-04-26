const express = require("express");
const router = express.Router();
const {
  updateCommentVoteCount,
  deleteCommentById
} = require("../controllers/comments");

router.delete("/:comment_id", deleteCommentById);
router.put("/:comment_id", updateCommentVoteCount);

module.exports = router;
