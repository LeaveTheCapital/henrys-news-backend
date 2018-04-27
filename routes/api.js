const express = require("express");
const router = express.Router();
const topicsRouter = require("./topics");
const usersRouter = require("./users");
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const apiHome = require("../utils/api.json");

router.get("/", (req, res, next) => {
  res.send(apiHome);
});

router.use("/topics", topicsRouter);
router.use("/users", usersRouter);
router.use("/articles", articlesRouter);
router.use("/comments", commentsRouter);

module.exports = router;
