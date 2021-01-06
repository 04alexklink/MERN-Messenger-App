class MessageApp {
  constructor() {
    this.messages = [];
  }

  create(messageContent) {
    var message = {
      content : messageContent,
      id : this.messages.length,
      date : new Date()
    }
    this.messages.push(message);
  }

  get(messageID) {
    return this.messages[messageID];
    // this.messages.forEach((message) => {
    //   if(message.id === messageID) {
    //     console.log(message)
    //     var selectedMessage = message;
    //     return [selectedMessage];
    //   }
    // })
  }
}

export default MessageApp