const mongoose = require("mongoose");
const { Article, Comment, Topic, User } = require("../models");
const { createIdReferenceObject, formatArticleData } = require("../utils");

function seedDB(
  topicData,
  articleData,
  userData,
  orderFunction,
  commentFunction
) {
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
      const userIds = createIdReferenceObject(userData, userDocs, "name");
      const topicIds = createIdReferenceObject(topicData, topicDocs, "slug");
      // const orderArr = orderFunction(userIds);
      const formattedArticleData = formatArticleData(
        articleData,
        topicIds,
        userIds,
        orderFunction
      );
      return Promise.all([
        userIds,
        topicDocs,
        userDocs,
        Article.insertMany(formattedArticleData)
      ]);
    })
    .then(([userIds, topicDocs, userDocs, articleDocs]) => {
      console.log(`inserted ${articleDocs.length} articles`);
      const commentData = commentFunction(articleDocs, userIds);
      return Promise.all([
        topicDocs,
        userDocs,
        articleDocs,
        Comment.insertMany(commentData)
      ]);
    })
    .then(data => {
      console.log(`inserted ${data[3].length} comment(s)`);
      return data;
    });
}

module.exports = seedDB;
