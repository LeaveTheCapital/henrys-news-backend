const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const { createUserIdReferenceObject, formatArticleData } = require("../utils");

function seedDB(topicData, articleData, userData, orderFunction) {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      console.log("database dropped");
      return Promise.all([
        Topic.insertMany(topicData),
        User.insertMany(userData)
      ]);
    })
    .then(([topicDocs, userDocs]) => {
      console.log(`inserted ${topicDocs.length} topics`);
      console.log(`inserted ${userDocs.length} users`);
      const userIds = createUserIdReferenceObject(userData, userDocs);
      // const orderArr = orderFunction(userIds);
      const formattedArticleData = formatArticleData(articleData, topicIds, userIds)
    })
    .then(data => {
      return data;
    });
}

module.exports = seedDB;
