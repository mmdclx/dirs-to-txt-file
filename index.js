const fs = require('fs')
const getDirs = require('get-dirs')
const through2 = require('through2')

module.exports = function dirsToTxtFile(rootDir, writeTo, exclude=[]) {

  let writeToFile = fs.createWriteStream(writeTo)

  getDirs(rootDir, exclude, readableStream => {
    readableStream
      .pipe(through2(function transformChunkToNewLine(chunk, enc, done) {
        this.push(chunk += '\n')
        done()
       }))
      .pipe(writeToFile)
  })

}
