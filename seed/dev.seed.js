const DB_URL = require("../config");
const seedDB = require("./seed");
const { articleData, topicData, userData } = require("./devData");
const mongoose = require("mongoose");
const { randomOrderFunction } = require("../utils");

mongoose
  .connect("mongodb://localhost:27017/nc_news")
  .then(() => seedDB(topicData, articleData, userData, randomOrderFunction))
  .then(() => mongoose.disconnect());