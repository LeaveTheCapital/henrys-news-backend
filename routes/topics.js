const express = require("express");
const router = express.Router();
const {
  getAllTopics,
  getArticlesByTopicId,
  addArticleByTopicID
} = require("../controllers/topics");

router.post("/:topic_id/articles", addArticleByTopicID);
router.get("/:topic_id/articles", getArticlesByTopicId);
router.get("/", getAllTopics);

module.exports = router;
