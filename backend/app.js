class MessageApp {
  constructor() {
    this.messages = [];
  }

  create(messageContent) {
    var message = {
      content : messageContent,
      id : this.messages.length + 1,
      date : new Date()
    }
    this.messages.push(message);
  }
}

export default MessageApp