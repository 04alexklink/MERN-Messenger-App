import request from 'supertest';
import { expect } from "chai";
import MessageApp from "../app.js";

describe("message API endpoint tests", function(){
    it.only("gets all messages", function(done) {
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
})
