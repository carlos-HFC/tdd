const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
   const auth = req.headers.authorization

   if (!auth) {
      return res.status(401).json({ error: "Token inexistente" })
   }

   const [, token] = auth.split(' ')

   try {
      const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
      req.decoded = decoded.id
      return next()
   } catch (error) {
      return res.status(401).json({ error: "Token inválido" })
   }
}