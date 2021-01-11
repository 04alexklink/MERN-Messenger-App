import {Router} from "express"
var messageApp = require('./controller.js')
var router = Router()

router.get('/', async (req, res) => {
  await messageApp.getAll()
  .then((messages) => res.json(messages))
  .catch((err) => res.status(404).json(err))
})

router.post('/message', async (req, res) => { 
  await messageApp.create(req.body.content)
  .then((messages) => {res.json(messages)})
  .catch((err) => res.status(404).json(err))
})

router.put('/update/:id', async (req, res) => {
  var id = req.params.id
  var content = req.body.content
  await messageApp.update(id, content)
  .then((messages) => { 
    res.json(messages)
  })
  .catch((err) => res.status(404).json(err))
})

router.delete('/delete/:id', async (req, res) => {
  await messageApp.deleteMessage(req.params.id)
  .then((messages) => {
    res.json(messages)
  })
  .catch((err) => res.status(404).json(err))
})
// module.exports = router
export default router
