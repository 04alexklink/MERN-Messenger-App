// import fs from 'fs';
import mongoose from 'mongoose';

let MessageSchema = mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
});
let MessageApp = mongoose.model('messages', MessageSchema);

export default MessageApp;

// class MessageApp {
//   constructor(jsonMessageFile) {
//     this.filepath = jsonMessageFile
//     this.messages = this.filepath ? this.readFromJson() : [];
//   }

//   create(messageContent) {
//     if(messageContent !== undefined && messageContent !== '') {
//       var message = {
//         content : messageContent,
//         id : this._newID(),
//         date : new Date()
//       }
//       this.messages.push(message);
//       this.writeToJson();
//     }
//   }

//   get(messageID) {
//     return this.messages.filter(message => message.id == messageID )[0];
//   }

//   getAll() {
//     return this.messages;
//   }

//   update(messageID, newContent) {
//     var index = this.messages.findIndex(message => message.id == messageID);
//     if(index >= 0 && newContent !== undefined && newContent !== "") {
//     this.messages[index].content = newContent;
//     this.messages[index].date = new Date();
//     this.writeToJson();
//     return this.messages;
//     } else {
//       return "This message does not exist or updated content is missing."
//     }
//   }

//   delete(messageID) {
//     var index = this.messages.findIndex(message => message.id == messageID);
//     if(index >= 0) {
//     this.messages.splice(index,1);
//     this.writeToJson();
//     return this.messages;
//     } else {
//       return "This message does not exist."
//     }
//   }
//   _newID() {
//     if(this.messages.length >= 1) {
//     return this.messages[this.messages.length - 1].id + 1;
//     } else { 
//       return 1;
//     }
//   }

//   readFromJson() {
//     return JSON.parse(fs.readFileSync(
//       __dirname+this.filepath,"utf8",(err,data)=>{
//         if (err) throw err;
//       })
//     )
//   }
  
//   writeToJson() {
//     if (this.filepath) {
//       var jsonItem = JSON.stringify(this.messages)
//       fs.writeFileSync(__dirname+this.filepath, jsonItem, (err) => {
//         if (err) throw err;
//       });
//     }
//   }
// }
