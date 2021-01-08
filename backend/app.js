import express from 'express';
var app = express();

app.get('/', function (req, res) {
    res.send({ val: 'Hello World' })
 })

app.listen(3001)

export default app
