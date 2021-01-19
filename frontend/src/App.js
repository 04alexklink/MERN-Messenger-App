import React, { Component } from 'react';
import MessageList from './components/messageList.js';
import MessageForm from './components/messageForm.js';
import ErrorHandler from './components/errorHandler.js';
import axios from 'axios';
const PORT = 'http://localhost:3001';

class MessageApp extends Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      error: null
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
      console.log("I am being called")
    })
    .catch((err)=>{
      this.setState({
        messages: null
    })
    })
  }
  deleteMessage= (id) => {
    axios.delete(`${PORT}/delete/${id}`, {
      id: id
    })
    .then((result)=> {
      this.getAllMessages();
    })
    .catch((err) => {
      this.setState({
        error: err
      })
    })
  }
  sendUpdate = (id, content) => {
    axios.put(`${PORT}/update/${id}`, {
      content: content
    })
    .then((result)=>{
      this.getAllMessages()
    })
    .catch((err)=>{
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
      <MessageList ref='messageListRef' messages={this.state.messages} deleteMessage={this.deleteMessage} sendUpdate={this.sendUpdate}/>
      <ErrorHandler
      error={this.state.error}
      />
    </div>
    );
  }
}

export default MessageApp;
