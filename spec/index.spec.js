process.env.NODE_ENV = "test";
const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");
const request = supertest(app);
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { articleData, topicData, userData } = require("../seed/testData");

describe("/api", () => {
  let articleDocs, topicDocs, movieDocs;
  beforeEach(() => {
    return seedDB(topicData, articleData, userData).then(data => {
      topicDocs = data;
    });
  });
  after(() => mongoose.disconnect());
  describe("/topics", () => {
    it("get /topics returns a 200 and 2 topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.topics.length).to.equal(2);
        });
    });
  });
  describe("/users", () => {
    it("get /users returns a 200 and 2 users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.users.length).to.equal(2);
        });
    });
  });
});
