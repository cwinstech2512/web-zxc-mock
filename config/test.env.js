'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const mockEnv = require('./mock-env')

module.exports = merge(devEnv, mockEnv('testing'), {
  NODE_ENV: '"testing"'
})
