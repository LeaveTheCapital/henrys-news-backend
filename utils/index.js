const faker = require("faker");

exports.createUserIdReferenceObject = (data, docs) => {
  return data.reduce((acc, item, i) => {
    acc[item.name] = docs[i]._id;
    return acc;
  }, {});
};

exports.formatArticleData = ()