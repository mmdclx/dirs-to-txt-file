const fs = require('fs')
const getDirs = require('get-dirs')
const through2 = require('through2')
const { formatTxt, formatJson, formatTree, formatCsv, formatMarkdown } = require('./lib/formatters')

module.exports = function dirsToTxtFile(rootDir, writeTo, exclude=[], format='txt', options={}) {
  const { progress = false, verbose = false } = options
  const startTime = Date.now()
  let directoryCount = 0
  let currentDirectory = ''

  let writeToFile = fs.createWriteStream(writeTo)

  function showProgress(dirPath) {
    if (progress || verbose) {
      directoryCount++
      currentDirectory = dirPath
      
      // Only show progress to stderr if stdout is not being redirected
      if (process.stderr.isTTY) {
        process.stderr.clearLine(0)
        process.stderr.cursorTo(0)
        process.stderr.write(`Scanning: ${currentDirectory} (${directoryCount} directories found)`)
      }
    }
  }

  function showFinalStats() {
    if (progress || verbose) {
      const elapsed = Date.now() - startTime
      const rate = Math.round(directoryCount / (elapsed / 1000))
      
      if (process.stderr.isTTY) {
        process.stderr.clearLine(0)
        process.stderr.cursorTo(0)
      }
      
      if (verbose) {
        console.error(`\nCompleted: ${directoryCount} directories in ${elapsed}ms (${rate} dirs/sec)`)
        console.error(`Output written to: ${writeTo}`)
      } else if (progress) {
        console.error(`\nFound ${directoryCount} directories`)
      }
    }
  }

  if (format === 'txt') {
    getDirs(rootDir, exclude, readableStream => {
      readableStream
        .pipe(through2(function transformChunkToNewLine(chunk, enc, done) {
          showProgress(chunk.toString())
          this.push(formatTxt(chunk))
          done()
         }))
        .pipe(writeToFile)
        .on('finish', showFinalStats)
    })
  } else {
    const allDirs = []
    
    getDirs(rootDir, exclude, readableStream => {
      readableStream
        .pipe(through2(function collectDirs(chunk, enc, done) {
          const dirPath = chunk.toString()
          showProgress(dirPath)
          allDirs.push(dirPath)
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
        .on('finish', showFinalStats)
    })
  }

}
