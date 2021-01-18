import mongoose from 'mongoose';

let MessageSchema = mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
});
let MessageApp = mongoose.model('messages', MessageSchema);

export default MessageApp;
