import express from 'express';
var app = express();
import MessageApp from './lib/model.js';

var messageApp = new MessageApp('/json/testMessages.json');

app.get('/', async (req, res) => {
    var messages = messageApp.getAll();
    res.json(messages);
 })

app.listen(3001, function() {
  console.log("Connected");
})

export default app
