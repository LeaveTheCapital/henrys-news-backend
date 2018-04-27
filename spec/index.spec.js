process.env.NODE_ENV = "test";
const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");
const request = supertest(app);
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const { testOrderFunction, createTestCommentData } = require("../utils");
const { articleData, topicData, userData } = require("../seed/testData");

describe("/api", function() {
  this.timeout(6000);
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
      return request
        .get(`/api/topics/${topicDocs[0]._id}/articles`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].belongs_to).to.equal(
            topicDocs[0]._id.toString()
          );
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
          expect(body.article.title).to.equal("test article");
          expect(body.article.body).to.equal(
            "this is the start of an extremely engaging test article"
          );
        });
    });
    it("ERROR HANDLING: bad post /topics/:topic_id/articles return a 400 and the message 'could not add article' ", () => {
      return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({
          body: "this is the start of an extremely engaging test article",
          belongs_to: topicDocs[0]._id,
          created_by: userDocs[0]._id
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("could not add article");
        });
    });
  });
  describe("/users", () => {
    it("get /users/:username returns a 200 and a JSON object of the user", () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.user.username).to.equal("butter_bridge");
          expect(body.user._id).to.equal(userDocs[0]._id.toString());
        });
    });
  });
  describe("/articles", () => {
    it("post /articles/:article_id/comments return a 201 and adds a comment to that article ", () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          body: "this is the start of an extremely engaging test comment",
          belongs_to: articleDocs[0]._id,
          created_by: userDocs[0]._id
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).to.equal(
            "this is the start of an extremely engaging test comment"
          );
        });
    });
    it("ERROR HANDLING: bad post /articles/:article_id/comments return a 400 and the message 'could not add comment' ", () => {
      return request
        .post(`/api/articles/${articleDocs[0]._id}/comments`)
        .send({
          bodydfdafddsf:
            "this is the start of an extremely engaging test comment",
          belongs_to: articleDocs[0]._id,
          created_by: userDocs[0]._id
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("could not add comment");
        });
    });
    it("get /articles returns a 200 and 4 articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles.length).to.equal(4);
          expect(body.articles[0].comment_count).to.equal(2);
          expect(body.articles[0].votes).to.equal(0);
        });
    });
    it("get /articles/:article_id returns a 200 and the article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article._id).to.equal(articleDocs[0]._id.toString());
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
          expect(body.comments[0].belongs_to).to.equal(
            articleDocs[0]._id.toString()
          );
          expect(body.comments.length).to.equal(2);
        });
    });
    it("PUT /api/articles/:article_id with a query of up returns a 200 and the vote is incremented", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article._id).to.equal(articleDocs[0]._id.toString());
          expect(body.article.votes).to.equal(1);
        });
    });
    it("PUT /api/articles/:article_id with a query of down returns a 200 and the vote is decremented ", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
        .expect(200)
        .then(({ body }) => {
          expect(body.article._id).to.equal(articleDocs[0]._id.toString());
          expect(body.article.votes).to.equal(-1);
        });
    });
    // it("PUT /api/articles/:article_id with any other query leave the vote count alone", () => {
    //   return request
    //     .put(`/api/articles/${articleDocs[0]._id}?vote=asdf`)
    //     .expect(200)
    //     .then(({ body }) => {
    //       expect(body.article._id).to.equal(articleDocs[0]._id.toString());
    //       expect(body.article.votes).to.equal(0);
    //     });
    // });
    it("ERROR HANDLING: bad PUT /api/articles/:article_id with invalid query will return a 400 and leave the vote count alone", () => {
      return request
        .put(`/api/articles/${articleDocs[0]._id}?vote=asdf`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal(
            "invalid query. could not update votes"
          );
        });
    });
  });
  describe("/comments", () => {
    it("PUT /api/comments/:comment_id with a query of up returns a 200 and the vote is incremented", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment._id).to.equal(commentDocs[0]._id.toString());
          expect(body.comment.votes).to.equal(1);
        });
    });
    it("PUT /api/comments/:comment_id with a query of down returns a 200 and the vote is decremented ", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment._id).to.equal(commentDocs[0]._id.toString());
          expect(body.comment.votes).to.equal(-1);
        });
    });
    // it("PUT /api/comments/:comment_id with any other query leaves the vote count alone", () => {
    //   return request
    //     .put(`/api/comments/${commentDocs[0]._id}?vote=asdf`)
    //     .expect(200)
    //     .then(({ body }) => {
    //       expect(body.comment._id).to.equal(commentDocs[0]._id.toString());
    //       expect(body.comment.votes).to.equal(0);
    //     });
    // });
    it("ERROR HANDLING: bad PUT /api/comments/:comment_id returns a 400 and an error message", () => {
      return request
        .put(`/api/comments/${commentDocs[0]._id}?vote=asdf`)
        .expect(400)
        .then(({ body }) => {
          // expect(body.comment._id).to.equal(commentDocs[0]._id.toString());
          expect(body.message).to.equal(
            "invalid query. could not update votes"
          );
        });
    });
    it("DELETE /api/comments/:comment_id returns a 200, the id and a confirmation", () => {
      return request
        .delete(`/api/comments/${commentDocs[0]._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.id).to.equal(commentDocs[0]._id.toString());
          expect(body.message).to.equal("comment deleted");
        });
    });
  });
});
