const DB_URL = require("../config");
const seedDB = require("./seed");
const { articleData, topicData, userData } = require("./devData");
const mongoose = require("mongoose");
const { randomOrderFunction, createRandomCommentData } = require("../utils");

console.log(DB_URL);

mongoose
  .connect(DB_URL)
  .then(() =>
    seedDB(
      topicData,
      articleData,
      userData,
      randomOrderFunction,
      createRandomCommentData,
      7
    )
  )
  .then(() => mongoose.disconnect());
