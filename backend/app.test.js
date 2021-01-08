import { expect } from "chai";
import MessageApp from './app.js'

describe("app", function() {
  var app;
  beforeEach(() => {
    app = new MessageApp;
  })
  it("reads and writes from a given filepath", function() {
    var testFileWriteApp = new MessageApp('/json/testMessages.json/');
    expect(testFileWriteApp.getAll().length).to.equal(0);
    testFileWriteApp.create("Writing a message");
    expect(testFileWriteApp.getAll().length).to.equal(1);
    var testFileReadApp = new MessageApp('/json/testMessages.json/');
    expect(testFileReadApp.getAll().length).to.equal(1);
    testFileReadApp.delete(1);
    var testFileClearedApp = new MessageApp('/json/testMessages.json/');
    expect(testFileClearedApp.getAll().length).to.equal(0);
  })
  it("can store messages but has no messages when created", function() {
    expect(app.getAll()).to.be.an('array');
    expect(app.getAll()).to.deep.equal([]);
  });
  it("creates messages with an id, date and content", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    expect(app.getAll()[1].content).to.equal("Hello, I'm message no2");
    expect(app.getAll()[1].id).to.equal(2);
    expect(app.getAll()[1].date).not.to.equal(undefined);
  })
  it("can return individual messages id, content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    expect(app.get(2).content).to.equal("Hello, I'm message no2");
    expect(app.get(2).id).to.equal(2);
    expect(app.get(2).date).not.to.equal(undefined);
  })
  it("can return all messages", function() {
    expect(app.getAll()).to.be.an('array');
    app.create("Message 1");
    expect(app.getAll()[0].content).to.equal("Message 1")
  })
  it("app can update a messages content and date", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.update(1, "Hello, I've been updated");
    expect(app.get(1).content).to.equal("Hello, I've been updated");
  })
  it("rejects false updates", function() {
    expect(app.update(1)).to.equal("This message does not exist or updated content is missing.")
    expect(app.getAll()).to.deep.equal([]);
    expect(app.create("Hello"));
    expect(app.update(1)).to.equal("This message does not exist or updated content is missing.");
    expect(app.update(1, "")).to.equal("This message does not exist or updated content is missing.");
  })
  it("rejects empty messages from being created", function() {
    app.create();
    app.create('');
    expect(app.getAll()).to.deep.equal([]);
  })
  it("can delete a message", function() {
    app.create("Hello, I am a message");
    app.create("Hello, I'm message no2");
    app.delete(1);
    expect(app.get(1)).to.equal(undefined)
  })
  it("returns an error message if message to be deleted did not exist", function() {
    expect(app.delete(1)).to.equal("This message did not exist.");
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