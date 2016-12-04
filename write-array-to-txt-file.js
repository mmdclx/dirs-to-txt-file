#!/usr/bin/env node

const fs = require('fs')
const getAllDirsRecursively = require('./getAllDirsRecursively')

let dirs = getAllDirsRecursively(__dirname)

let ws = fs.createWriteStream(`${__dirname}/test.txt`)

ws.on('end', () => {
  console.log('ended writing stream')
})

dirs.forEach(dir => {
  ws.write(dir + '\n')
})
ws.end()
