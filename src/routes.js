const routes = require('express').Router()

const auth = require('./app/middlewares/auth')
const Session = require('./app/controllers/SessionController')

routes.post('/sessions', Session.store)

routes.get('/dashboard', auth, (req, res) => {
   return res.status(200).send()
})

module.exports = routes