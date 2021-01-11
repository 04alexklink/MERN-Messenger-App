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
})
