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
    expect(app.messages.length).to.equal(2);
  });
  it("creates messages with an id, date and content", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    expect(app.messages[1].content).to.equal("Hello, I'm message no2");
    expect(app.messages[1].id).to.equal(2);
    expect(app.messages[1].date).not.to.equal(undefined);
  })
});