import React from 'react';

class MessageList extends React.Component {
  render() {
    
      if(this.props.messages) {
        return (
          <ul id="message_list">
          {this.props.messages.map((message) => {
            return <li className={message} key={message.id}>
            {message.content}
            <br/>
            {message.date}
            <br/>
            <button onClick={()=> this.props.deleteMessage(message.id)} id='delete'>delete</button>
            </li>
          })} 
          </ul>)} else {
        return (
            <ul id="message_list"><li id="no_messages">No Messages:</li></ul>
        )
        }
      }
  }
export default MessageList;
