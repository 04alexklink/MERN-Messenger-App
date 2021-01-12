import React from 'react';

function MessageApp() {
  return (
    <div className="MessageApp">
      <textarea id="message_box"></textarea>
      <button type="submit" name="Submit" id="submit">Submit</button>
      <ul id="message_list">Message:</ul>
    </div>
  );
}

export default MessageApp;
