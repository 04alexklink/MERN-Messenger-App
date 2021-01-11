import express from 'express';
var app = express();
import MessageApp from './lib/model.js';

var messageApp;
if (process.env.npm_lifecycle_event == "test") {
  messageApp = new MessageApp('/json/testMessages.json');
} else {
  messageApp = new MessageApp('/json/messages.json');
}
app.get('/', async (req, res) => {
  var messages = messageApp.getAll();
  res.json(messages);
})

app.listen(3001, function() {
  console.log("Connected");
})

export default app
