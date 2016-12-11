const getDirs = require('get-dirs')
const writeArrayToTxtFile = require('./write-array-to-txt-file')
const through2 = require('through2')

module.exports = function dirsToTxtFile(rootDir, writeTo, exclude=[]) {
  let result = getDirs(rootDir, exclude)

  writeArrayToTxtFile(result, writeTo, () => {
    console.log(`Successfully wrote to file ${writeTo}`)
  })
}
