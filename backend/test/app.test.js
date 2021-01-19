import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from "chai";
import MessageApp from "../app.js";

describe("message API endpoint tests", function(){
  let data;
  let id;
  before(function (done) {
    mongoose.connect(`mongodb://localhost/testMessages`, { useNewUrlParser: true, useFindAndModify: false }, function(){
    mongoose.connection.db.dropDatabase(function(){
    done()
    })
    })
    })
  it("posts a message", function(done) {
    data = {
      content: "hi world"
    };
    var res = request(MessageApp)
    .post("/message")
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
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
      id = res.body[0]._id;
      expect(res.body.length).to.equal(1);
      expect(res.body[0].content).to.equal('hi world');
      done()
    })
  })
  it("gets one message", function(done) {
    var res = request(MessageApp).get(`/message/${id}`)
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
    data = { content : "GoodMorning World" }
    var res = request(MessageApp)
    .put(`/update/${id}`)
    .send(data)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
    expect(res.body.content).to.equal("GoodMorning World")
    done()
    })
  })
  it("deletes a message", function(done) {
    var res = request(MessageApp)
    .delete(`/delete/${id}`)
    .set("Accept", "application/json")
    res.expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err)
      }
      expect(res.body.deletedCount).to.equal(1)
    done()
    })
  })
describe("errors raised by message API when necessary", function() {
  it("produces error if try to get messages when none exist", function(done) {
    var res = request(MessageApp).get("/")
    res.expect(404)
    .end(function(err, res) {
      if(err) {
        return done(err);
      }
      expect(res.body).to.equal("No messages in database")
      done();
    })
  })
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
      expect(res.body).to.equal("You can't post an empty message")
      done()
    })
   })
  it("raises error if try to update a message that doesn't exist", function(done) {
    var data = { content: "Hey" }
    var res = request(MessageApp)
    .put("/update/5e3488081b8bfa79a6625542")
    .send(data)
    .set("Accept", "application/json")
    res.expect(404)
    .end(function(err, res) {
      if(err) {
        return done(err);
      }
      expect(res.body).to.equal("Message not found in database")
      done()
    })
  })
  it("creates an error if single message does not exist", function(done) {
    var res = request(MessageApp).get("/message/5e3488081b8bfa79a6625542")
    res.expect(404)
    .end(function (err, res) {
      if(err) {
        return done(err);
      }
      expect(res.body).to.equal("Message not found in database")
      done();
    })
  })
  it("raises error if try to delete a message that doesn't exist", function(done) {
    var res = request(MessageApp)
    .delete("/delete/5e3488081b8bfa79a6625542")
    .set("Accept", "application/json")
    res.expect(404)
    .end(function (err, res) {
      if(err) {
        return done(err);
      }
      expect(res.body).to.equal("Message not found in database")
      done();
    })
  })
  })
})
