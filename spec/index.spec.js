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
  // this.timeout(5000);
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
  describe.only("/topics", () => {
    it("get /topics returns a 200 and 2 topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).to.equal(2);
        });
    });
    it("get /topics/:topic_id/articles returns a 200 and the correct articles", () => {
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(2);
        });
    });
    it("post /topics/:topic_id/articles return a 201 and adds an article to that topic ", () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({
          title: "test article",
          body: "this is the start of an extremely engaging test article",
          belongs_to: topicDocs[0]._id,
          created_by: userDocs[0]._id
        })
        .expect(201)
        .then(({ body }) => {
          console.log(body);
          expect(body.article.title).to.equal("test article");
          expect(body.article.body).to.equal(
            "this is the start of an extremely engaging test article"
          );
        });
    });
  });
  describe("/users", () => {
    it("get /users/:username returns a 200 and a JSON object of the user", () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.user.username).to.equal("butter_bridge");
        });
    });
  });
  describe("/articles", () => {
    it("get /articles returns a 200 and 4 articles", () => {
      return (
        request
          .get("/api/articles")
          // TODO: add comment count and check user populated
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(4);
          })
      );
    });
    it("get /articles/:article_id returns a 200 and the article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.body).to.equal(
            "I find this existence challenging"
          );
        });
    });
    it("get /articles/:article_id/comments returns a 200 and the comments", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}/comments`)
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body.comments.length).to.equal(2);
        });
    });
    it("PUT /api/articles/:article_id with a query of up returns a 201 and the vote is incremented", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(1);
        });
    });
    it("PUT /api/articles/:article_id with a query of down returns a 201 and the vote is decremented ", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(-1);
        });
    });
    it("PUT /api/articles/:article_id with any other query leave the vote count alone", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=asdf`)
        .expect(201)
        .then(({ body }) => {
          expect(body.article.votes).to.equal(0);
        });
    });
  });
  describe("/comments", () => {
    it("PUT /api/comments/:comment_id with a query of up returns a 201 and the vote is incremented", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(201)
        .then(({ body }) => {
          console.log(body);
          expect(body.comment.votes).to.equal(1);
        });
    });
    it("PUT /api/comments/:comment_id with a query of down returns a 201 and the vote is decremented ", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(-1);
        });
    });
    it("PUT /api/comments/:comment_id with any other query leave the vote count alone", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=asdf`)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.votes).to.equal(0);
        });
    });
  });
});
