process.env.NODE_ENV = "test";
const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");
const request = supertest(app);
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { testOrderFunction, createTestCommentData } = require("../utils");
const { articleData, topicData, userData } = require("../seed/testData");

describe("/api", () => {
  let articleDocs, topicDocs, movieDocs;
  beforeEach(() => {
    return seedDB(
      topicData,
      articleData,
      userData,
      testOrderFunction,
      createTestCommentData
    ).then(data => {
      topicDocs = data[0];
      userDocs = data[1];
      articleDocs = data[2];
      commentDocs = data[3];
    });
  });
  after(() => mongoose.disconnect());
  describe("/topics", () => {
    it("get /topics returns a 200 and 2 topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).to.equal(2);
        });
    });
    it("get /topics/:topic_id/articles returns a 200 and the correct articles", () => {
      console.log(topicDocs[0]._id);
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(2);
        });
    });
  });
  describe("/users", () => {
    it("get /users returns a 200 and 2 users", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).to.equal(2);
        });
    });
  });
  describe("/articles", () => {
    it("get /articles returns a 200 and 4 articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(4);
        });
    });
  });
  xdescribe("/comments", () => {
    it("PUT /api/comments/:comment_id a 201 and ", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comments.length).to.equal(4);
        });
    });
  });
});
