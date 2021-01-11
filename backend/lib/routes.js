import {Router} from "express"
var messageApp = require('./controller.js')
var router = Router()

router.get('/', async (req, res) => {
  await messageApp.getAll()
  .then((messages) => res.json(messages))
  .catch((err) => res.status(404).json(err))
})

// module.exports = router
export default router
