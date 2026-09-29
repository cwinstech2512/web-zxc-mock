'use strict'
const mockEnv = require('./mock-env')

module.exports = Object.assign({
  NODE_ENV: '"production"',
}, mockEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development'))
