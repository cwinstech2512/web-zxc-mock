'use strict'

const fs = require('fs')
const path = require('path')

function readEnvFiles () {
  const values = {}
  ;['.env', '.env.local'].forEach(name => {
    const file = path.resolve(__dirname, '..', name)
    if (!fs.existsSync(file)) return
    fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (!match || match[1].charAt(0) === '#') return
      values[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    })
  })
  return values
}

const fileEnv = readEnvFiles()

function env (name, fallback) {
  if (typeof process.env[name] !== 'undefined') return process.env[name]
  if (typeof fileEnv[name] !== 'undefined') return fileEnv[name]
  return fallback
}

function isTrue (value) {
  return String(value || '').toLowerCase() === 'true'
}

module.exports = function mockEnv (nodeEnv) {
  const useMock = isTrue(env('WEB_USE_MOCK'))
  const allowProductionMock = isTrue(env('ALLOW_PRODUCTION_MOCK'))

  if (nodeEnv === 'production' && useMock && !allowProductionMock) {
    throw new Error(
      'Production mock build blocked. Set ALLOW_PRODUCTION_MOCK=true only for an intentional demo build.'
    )
  }

  return {
    WEB_USE_MOCK: JSON.stringify(useMock),
    WEB_MOCK_DELAY: JSON.stringify(Number(env('WEB_MOCK_DELAY', 120)))
  }
}
