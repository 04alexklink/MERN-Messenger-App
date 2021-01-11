import MessageApp from './model.js';
var messageApp;
if (process.env.npm_lifecycle_event == "test") {
  messageApp = new MessageApp('/json/testMessages.json');
} else {
  messageApp = new MessageApp('/json/messages.json');
}

function getAll(){
  return new Promise((resolve, reject) => {
    var result = messageApp.getAll();
    if (result !== []) {
      resolve(result);
    } else {
      reject(result);
    }
  })
}
  module.exports = {
    getAll
  }
