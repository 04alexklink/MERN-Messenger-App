class MessageApp {
  constructor() {
    this.messages = [];
  }

  create(messageContent) {
    var message = {
      content : messageContent,
      id : this._newID(),
      date : new Date()
    }
    this.messages.push(message);
  }

  get(messageID) {
    return this.messages.filter(message => message.id === messageID )[0];
  }

  update(messageID, newContent) {
    var index = this.messages.findIndex(message => message.id === messageID);
    this.messages[index].content = newContent;
    this.messages[index].date = new Date();
  }

  delete(messageID) {
    var index = this.messages.findIndex(message => message.id === messageID);
    this.messages.splice(index,1);
  }
  _newID() {
    if(this.messages.length >= 1) {
    return this.messages[this.messages.length - 1].id + 1;
    } else { 
      return 1;
    }
  }

}

export default MessageApp