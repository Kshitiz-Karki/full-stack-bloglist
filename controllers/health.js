const healthCheckRouter = require('express').Router()

healthCheckRouter.get('/', (_req, res) => {
  res.send('ok')
})

module.exports = healthCheckRouter