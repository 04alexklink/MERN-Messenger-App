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
    expect(app.messages[1].id).to.equal(1);
    expect(app.messages[1].date).not.to.equal(undefined);
  })
  it("can return individual messages id, content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    expect(app.get(1).content).to.equal("Hello, I'm message no2");
    expect(app.get(1).id).to.equal(1);
    expect(app.get(1).date).not.to.equal(undefined);
  })
  it("app can update a messages content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.update(1, "Hello, I've been updated");
    expect(app.get(1).content).to.equal("Hello, I've been updated");
  })
});