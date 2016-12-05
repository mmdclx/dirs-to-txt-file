#!/usr/bin/env node

const fs = require('fs')

module.exports = function writeArrayToTxtFile(array, txtFilePath, cb) {

  let ws = fs.createWriteStream(txtFilePath)

  ws.on('finish', () => {
    console.log(`Completed writing to txt file: ${txtFilePath}`)
    cb(null)
  })

  array.forEach(v => {
    ws.write(`${v}\n`)
  })
  ws.end()

}
