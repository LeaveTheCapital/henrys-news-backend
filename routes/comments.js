const express = require("express");
const router = express.Router();
const { updateVoteCount } = require("../controllers/comments");

router.get("/", updateVoteCount);

module.exports = router;
