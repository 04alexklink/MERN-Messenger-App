import MessageApp from './model.js';

function getAll(){
  return MessageApp.find()
}

function getOne(id) {
  return MessageApp.findOne({_id: id})
}

function create(content) {
  let newMessage = new MessageApp({content: content})
  return newMessage.save()
}

function update(id, content) {
  return MessageApp.findOneAndUpdate({_id: id}, {content: content}, {new: true})
}

function deleteMessage(id){
  return MessageApp.deleteOne({_id: id})
}

module.exports = {
  getAll,
  create,
  deleteMessage,
  update, 
  getOne
}
