#!/usr/bin/env node

const fs = require('fs')

module.exports = function writeArrayToTxtFile(array, txtFilePath, cb) {

  let ws = fs.createWriteStream(txtFilePath)

  ws.on('finish', () => {
    cb(null)
  })

  array.forEach(v => {
    ws.write(`${v}\n`)
  })
  ws.end()

}
