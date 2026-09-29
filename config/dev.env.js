'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const mockEnv = require('./mock-env')

module.exports = merge(prodEnv, mockEnv('development'), {
  NODE_ENV: '"development"',
})
