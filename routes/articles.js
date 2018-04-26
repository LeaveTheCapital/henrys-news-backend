const express = require("express");
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  updateArticleVoteCount
} = require("../controllers/articles");

router.put("/:article_id", updateArticleVoteCount);
router.get("/:article_id/comments", getCommentsByArticleId);
router.get("/:article_id", getArticleById);
router.get("/", getAllArticles);

module.exports = router;
