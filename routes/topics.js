const express = require("express");
const router = express.Router();
const { getAllTopics, getArticlesByTopicId } = require("../controllers/topics");

router.get("/", getAllTopics);

router.get("/:topic_id/articles", getArticlesByTopicId);

module.exports = router;
