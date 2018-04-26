const express = require("express");
const router = express.Router();
const { updateCommentVoteCount } = require("../controllers/comments");

router.put("/:comment_id", updateCommentVoteCount);

module.exports = router;
