class MessageApp {
  constructor() {
    this.messages = [];
  }

  create(messageContent) {
    this.messages.push(messageContent);
  }
}

export default MessageApp