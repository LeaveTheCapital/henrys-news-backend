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
  return [
    {
      body: "this is a test comment. very dull indeed",
      belongs_to: articleDocs[0]._id,
      created_by: userIds.mitch
    },
    {
      body: "second test comment. Lorem ipsum etc",
      belongs_to: articleDocs[0]._id,
      created_by: userIds.jonny
    }
  ];
};

exports.createRandomCommentData = (articleDocs, userIds, userDocs) => {
  const commentsArr = [];
  articleDocs.forEach(article => {
    const randomNumOfComments = Math.floor(Math.random() * 5);
    const randomUser = Math.floor(Math.random() * (userDocs.length - 1));
    for (let i = 0; i < randomNumOfComments; i++) {
      commentsArr.push({
        body: faker.lorem.words(),
        belongs_to: article._id,
        created_by: userDocs[randomUser]._id
      });
    }
  });
  return commentsArr;
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

exports.generateCount = (docs, model) => {
  return docs.map(doc => model.find({ belongs_to: doc._id }).count());
};
