import { expect } from "chai";
import MessageApp from './app.js'

describe("app", function() {
  var app;
  beforeEach(() => {
    app = new MessageApp;
  })
  it("reads and writes from a given filepath", function() {
    var testFileWriteApp = new MessageApp('/json/testMessages.json/');
    expect(testFileWriteApp.messages.length).to.equal(0);
    testFileWriteApp.create("Writing a message");
    expect(testFileWriteApp.messages.length).to.equal(1);
    var testFileReadApp = new MessageApp('/json/testMessages.json/');
    expect(testFileReadApp.messages.length).to.equal(1);
    testFileReadApp.delete(1);
    var testFileClearedApp = new MessageApp('/json/testMessages.json/');
    expect(testFileClearedApp.messages.length).to.equal(0);
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
  it("can return individual messages id, content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    expect(app.get(2).content).to.equal("Hello, I'm message no2");
    expect(app.get(2).id).to.equal(2);
    expect(app.get(2).date).not.to.equal(undefined);
  })
  it("app can update a messages content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.update(1, "Hello, I've been updated");
    expect(app.get(1).content).to.equal("Hello, I've been updated");
  })
  it("can delete a message", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.delete(1);
    expect(app.get(1)).to.equal(undefined)
  })
  it("app message id's are always unique", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.create("Hello, i'm the third message")
    app.delete(1)
    app.create("Hey, i'm the fourth message created")
    expect(app.messages[2].id).to.equal(4);
  })
});