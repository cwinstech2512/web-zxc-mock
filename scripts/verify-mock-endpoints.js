'use strict'

process.env.BABEL_ENV = 'test'
require('babel-register')

const fs = require('fs')
const path = require('path')
const mock = require('../src/mock/adapter')

const sourceRoot = path.resolve(__dirname, '../src')
const endpoints = {}

function visit (directory) {
  fs.readdirSync(directory).forEach(name => {
    const file = path.join(directory, name)
    const stat = fs.statSync(file)
    if (stat.isDirectory()) {
      visit(file)
      return
    }
    if (!/\.(js|vue)$/.test(name) || file.indexOf(path.join('src', 'mock')) >= 0) return

    const source = fs.readFileSync(file, 'utf8')
    const pattern = /['"](\/?api\/[A-Za-z0-9_./?-]+)/g
    let match
    while ((match = pattern.exec(source))) {
      let endpoint = match[1]
      if (endpoint.charAt(0) !== '/') endpoint = '/' + endpoint
      if (/\/message\/get\/$/i.test(endpoint)) {
        endpoint += '1'
      } else if (/\/$/.test(endpoint)) {
        endpoint += 'mock'
      }
      endpoints[endpoint] = true
    }
  })
}

visit(sourceRoot)

if (mock.normalizePath('/mock-api/api/Other/Check') !== '/api/other/check') {
  console.error('Mock endpoint verification failed: combined baseURL normalization is incorrect')
  process.exit(1)
}

const failures = []
Object.keys(endpoints).sort().forEach(endpoint => {
  try {
    mock.handle({
      method: 'post',
      url: endpoint,
      data: JSON.stringify({
        Account: 'mockuser',
        UserName: 'mockuser',
        PageIndex: 1,
        PageSize: 8,
        Plat: 'ZXC',
        Type: '1',
        Amount: 100,
        OutGame: 'ZXC',
        InGame: 'AG'
      })
    })
  } catch (error) {
    failures.push(endpoint + ': ' + error.message)
  }
})

if (failures.length) {
  console.error('Mock endpoint verification failed:\n' + failures.join('\n'))
  process.exit(1)
}

console.log('Verified ' + Object.keys(endpoints).length + ' API endpoint references. No request fell through to the network.')
