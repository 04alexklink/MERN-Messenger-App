import request from 'supertest';
import { expect } from "chai";
import MessageApp from "../app.js";

describe("message API endpoint tests", function(){
    it("posts a message", function(done) {
        var data = {
          content: "hi world"
        };
        const res = request(MessageApp)
        .post("/message")
        .send(data)
        .set("Accept", "application/json")
        res.expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err)
          }
          expect(res.body[0].content).to.equal('hi world');
          done()
        })
      })
  it("gets all messages", function(done) {
    var res = request(MessageApp).get("/")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.length).to.equal(1)
      done()
    })
  })
  it("gets one message", function(done) {
    var res = request(MessageApp).get("/message/1")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
    expect(res.body.content).to.equal("hi world")
    done()
    })
  })
  it("updates a message", function(done) {
    var data = { content : "GoodMorning World" }
    var res = request(MessageApp)
    .put("/update/1")
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
    expect(res.body[0].content).to.equal("GoodMorning World")
    done()
    })
  })
  it("deletes a message", function(done) {
    var res = request(MessageApp)
    .delete("/delete/1")
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
    expect(res.body.length).to.equal(0)
    done()
    })
  })
  describe("errors raised by message API when necessary", function() {
    it("raises error if emptry string or nothing sent as message content to post", function(done) {
      var data = { content: '' }
      var res = request(MessageApp)
      .post("/message")
      .send(data)
      .set("Accept", "application/json")
      res.expect(404)
      .end(function(err, res) {
        if(err) {
          return done(err);
        }
      expect(res.body).to.equal("You can't post an empty message.")
      done()
      })
    })
    it("raises error if try to update with no content", function(done) {
      var data = { content: "" }
      var res = request(MessageApp)
      .put("/update/1")
      .send(data)
      .set("Accept", "application/json")
      res.expect(404)
      .end(function(err, res) {
        if(err) {
          return done(err);
        }
      expect(res.body).to.equal("This message does not exist or updated content is missing.")
      done()
      })
    })
    it("raises error if try to update a message that doesn't exist", function(done) {
      var data = { content: "Hello" }
      var res = request(MessageApp)
      .put("/update/2")
      .send(data)
      .set("Accept", "application/json")
      res.expect(404)
      .end(function(err, res) {
        if(err) {
          return done(err);
        }
      expect(res.body).to.equal("This message does not exist or updated content is missing.")
      done()
      })
    })
  })
})
