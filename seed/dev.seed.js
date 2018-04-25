const DB_URL = require("../config");
const seedDB = require("./seed");
const { articleData, topicData, userData } = require("./devData");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nc_news")
  .then(() => seedDB(topicData, articleData, userData))
  .then(() => mongoose.disconnect());
