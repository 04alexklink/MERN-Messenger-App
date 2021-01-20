import express from "express"
import cors from 'cors'
import routes from "./lib/routes.js";
import mongoose from 'mongoose';
import config from './config/config';

mongoose.connect(config.db, { useNewUrlParser: true, useFindAndModify: false })
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', config.db)
})
db.on('error', err => {
  console.error('connection error:', err)
})

const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express())
app.use(routes)
app.listen(config.port, function(){
  console.log('App listening on port ' + config.port);
})

export default app
