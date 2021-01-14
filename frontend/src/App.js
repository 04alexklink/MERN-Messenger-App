import React, { Component } from 'react';
import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';
import ErrorHandler from './components/errorHandler.js';
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
    .catch((err) => {
      this.setState({
        error: err
      })
    })
  }
  getAllMessages=()=>{
    axios.get(`${PORT}/`)
    .then((result)=>{
      this.setState({
       messages: result.data
      })
    })
    .catch((err) => {
      this.setState({
        error: err
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
      <ErrorHandler
      error={this.state.error}
      />
    </div>
    );
  }
}

export default MessageApp;
