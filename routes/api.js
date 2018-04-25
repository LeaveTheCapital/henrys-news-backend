const express = require("express");
const router = express.Router();
const topicsRouter = require("./topics");
const usersRouter = require("./users");

router.use("/topics", topicsRouter);
router.use("/users", usersRouter);

module.exports = router;
