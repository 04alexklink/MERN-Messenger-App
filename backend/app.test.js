import { expect } from "chai";
import MessageApp from './app.js'

describe("app", function() {
  var app = new MessageApp;
  it("can store messages", function() {
    expect(app.messages).to.be.an('array');
    expect(app.messages.length).to.equal(0);
  });
});