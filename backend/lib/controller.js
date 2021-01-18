import MessageApp from './model.js';

function getAll(){
  return MessageApp.find()
  // return new Promise((resolve, reject) => {
  //   var result = messageApp.getAll();
  //   if (result.length !== 0 ) {
  //     resolve(result);
  //   } else {
  //     reject("There are no messages in the database.");
  //   }
  // })
}

function getOne(id) {
  return new Promise((resolve, reject) => {
  var result = messageApp.get(id)
  if(result != undefined) {
    resolve(result);
  } else {
    reject("This message is not in the database.");
  }
})
}

function create(content) {
  let newMessage = new MessageApp({content: content})
  return newMessage.save()
  // return new Promise((resolve,reject) => {
  //   messageApp.create(content)
  //   var result = messageApp.getAll();
  //   if (result.length !== 0) {
  //     resolve(result);
  //   } else {
  //     reject("You can't post an empty message.");
  //   }
  // })
}

function update(id, content) {
  return new Promise((resolve, reject) => {
    var result = messageApp.update(id, content)
    if(result != "This message does not exist or updated content is missing.") {
      resolve(result)
    } else {
      reject(result)
    }
  })
}

function deleteMessage(id){
  return new Promise((resolve, reject) => {
    let result = messageApp.delete(id)
    if (result != 'This message does not exist.') {
      resolve(result)
    } else {
      reject(result)
    }
  })
}

module.exports = {
  getAll,
  create,
  deleteMessage,
  update, 
  getOne
}
