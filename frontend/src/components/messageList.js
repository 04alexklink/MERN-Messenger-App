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
          id: message._id,
          content: message.content
        }
      })
}

 sendUpdate() {
  this.props.sendUpdate(this.state.editMode.id,this.state.editMode.content)
  this.toggleUpdate({id: null, content: null})
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
            var Content = message.content
            if(message._id=== this.state.editMode.id) {
              updateButton = <button
              onClick={()=>this.sendUpdate()}
              id='send'>Send Update</button>

              Content = <textarea onChange={(e) => this.setState({editMode: {
                id: message._id,
                content: e.target.value
              }} 
              )}
              value={this.state.editMode.content}
              ref='updateBox'
              id='updateBox'
              ></textarea>
            }
            return <li className={message} key={message._id}>
            {Content}
            <br/>
            {message.date}
            <br/>
            <button onClick={()=> this.props.deleteMessage(message._id)} id='delete'>delete</button>
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
