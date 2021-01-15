import React from 'react';

class MessageList extends React.Component {

  constructor(){
    super()
    this.state = {
      editMode: {
      id: null,
      content: null
      }
     }
   }
  toggleUpdate(message){
      this.setState({
        editMode: {
          id: message.id,
          content: message.content
        }
      })
}
  
  render() {
    
      if(this.props.messages) {
        return (
          <ul id="message_list">
          {this.props.messages.map((message) => {
            var updateButton = <button
            onClick={()=>this.toggleUpdate(message)}
            id='update'>
            Update
            </button>
            if(message.id=== this.state.editMode.id) {
              updateButton = <button
              onClick={() =>this.toggleUpdate(message)}
              id='send'>Send Update</button>
            }
            return <li className={message} key={message.id}>
            {message.content}
            <br/>
            {message.date}
            <br/>
            <button onClick={()=> this.props.deleteMessage(message.id)} id='delete'>delete</button>
            <br/>
            {updateButton}
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
