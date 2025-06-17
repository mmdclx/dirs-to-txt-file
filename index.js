const fs = require('fs')
const getDirs = require('get-dirs')
const through2 = require('through2')
const { formatTxt, formatJson, formatTree, formatCsv, formatMarkdown } = require('./lib/formatters')

module.exports = function dirsToTxtFile(rootDir, writeTo, exclude=[], format='txt') {

  let writeToFile = fs.createWriteStream(writeTo)

  if (format === 'txt') {
    getDirs(rootDir, exclude, readableStream => {
      readableStream
        .pipe(through2(function transformChunkToNewLine(chunk, enc, done) {
          this.push(formatTxt(chunk))
          done()
         }))
        .pipe(writeToFile)
    })
  } else {
    const allDirs = []
    
    getDirs(rootDir, exclude, readableStream => {
      readableStream
        .pipe(through2(function collectDirs(chunk, enc, done) {
          allDirs.push(chunk.toString())
          done()
        }, function flush(done) {
          let output
          
          switch(format) {
            case 'json':
              output = formatJson(allDirs, rootDir)
              break
            case 'tree':
              output = formatTree(allDirs, rootDir)
              break
            case 'csv':
              output = formatCsv(allDirs, rootDir)
              break
            case 'markdown':
              output = formatMarkdown(allDirs, rootDir)
              break
            default:
              output = allDirs.map(formatTxt).join('')
          }
          
          this.push(output)
          done()
        }))
        .pipe(writeToFile)
    })
  }

}
