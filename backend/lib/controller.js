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

function create(content) {
  return new Promise((resolve,reject) => {
    messageApp.create(content)
    var result = messageApp.getAll();
    if (result !== []) {
      resolve(result);
    } else {
      reject(result);
    }
  })
}

function deleteMessage(id){
  return new Promise((resolve, reject) => {
    let result = messageApp.delete(id)
    if (result !== 'This message does not exist.') {
      resolve(result)
    } else {
      reject(result)
    }
  })
}

module.exports = {
  getAll,
  create,
  deleteMessage
}
