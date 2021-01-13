import React from 'react';

class MessageForm extends React.Component {
    constructor(){
        super()
        this.state = {
          currentMessage: ''
        }
      }

    changeMessageValue(change){
        this.setState({
          currentMessage: change
        })
    }
    componentDidUpdate(){
        console.log(this.state.currentMessage)
      }

    processSubmit(e){
      e.preventDefault();
      this.props.submitMessage(this.state.currentMessage)
      this.changeMessageValue('')
    }

  render(){
    return (
      <form ref='formRef' onSubmit={(e)=>this.processSubmit(e)}>
      <textarea onChange={(e) => this.changeMessageValue(e.target.value)}
           value={this.state.currentMessage} id='message_box'></textarea>
      <br/>
      <button type="submit" name="Submit" id="submit">Submit</button>
      </form>
    );
  }
}

export default MessageForm