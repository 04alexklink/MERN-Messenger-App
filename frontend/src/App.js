import React, { Component } from 'react';
import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';
import './App.css';
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

  submitMessage = (data) => {
    axios.post(`${PORT}/message`, {
      content: data
    })
    .then(()=>{
      this.getAllMessages()
    })
  }
  getAllMessages=()=>{
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setState({
       messages: result.data
      })
    })
  }
componentDidMount() {
  this.getAllMessages();
}

  render() {
    return (
    <div className="MessageApp">
      <MessageForm ref='messageFormRef'
      submitMessage={this.submitMessage}/>
      <MessageList/>
    </div>
    );
  }
}

export default MessageApp;
