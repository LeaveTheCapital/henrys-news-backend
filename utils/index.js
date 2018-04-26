const faker = require("faker");

exports.createIdReferenceObject = (data, docs, key) => {
  return data.reduce((acc, item, i) => {
    acc[item[key]] = docs[i]._id;
    return acc;
  }, {});
};

exports.formatArticleData = (articleData, topicIds, userIds, orderFunction) => {
  return articleData.map((article, i) => {
    const { title, body } = article;
    const topicId = topicIds[article.topic];
    const formattedUsers = orderFunction(article, userIds, i);
    return {
      title,
      body,
      belongs_to: topicId,
      created_by: formattedUsers
    };
  });
};

exports.createTestCommentData = (articleDocs, userIds) => {
  return {
    body: "this is a test comment. very dull indeed",
    belongs_to: articleDocs[0]._id,
    created_by: userIds.mitch
  };
};

exports.testOrderFunction = (article, idRefObj, i) => {
  const keysArr = Object.keys(idRefObj);
  return i % keysArr.length === 0 ? idRefObj.jonny : idRefObj.mitch;
};

exports.randomOrderFunction = (article, idRefObj, i) => {
  const keysArr = Object.keys(idRefObj);
  const randomNum = Math.floor(Math.random() * keysArr.length);
  return idRefObj[keysArr[randomNum]];
};
