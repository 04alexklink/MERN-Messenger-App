import { expect } from "chai";
import MessageApp from './app.js'

describe("app", function() {
  var app;
  beforeEach(() => {
    app = new MessageApp;
  })
  it("can store messages", function() {
    expect(app.messages).to.be.an('array');
    expect(app.messages.length).to.equal(0);
  });
  it("can create messages", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2")
    expect(app.messages[0]).to.equal("Hello, I am a message");
    expect(app.messages[1]).to.equal("Hello, I'm message no2");
  });
});