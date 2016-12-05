const test = require('tape')
const fs = require('fs')
const getDirs = require('get-dirs')

const testDir = __dirname + '/testDirectory'

test('write-array-to-txt-file', t => {

  const writeArrayToTxtFile = require('../write-array-to-txt-file')
  const testFilePath = __dirname + '/test.txt'

  t.test('it creates a txt file with given name, if it does not exist', t => {

    writeArrayToTxtFile(['a', 'b', 'c'], testFilePath, err => {
      fs.access(testFilePath, err => {
        if(err) {
          console.error(err)
          t.fail()
        }
        fs.unlinkSync(testFilePath) // remove test file
        t.end()
      })
    })

  })

  t.test('it will populate txt file with given contents', t => {
    writeArrayToTxtFile(['👍', '✅', '😛'], testFilePath, err => {
      t.equal(fs.readFileSync(testFilePath, 'utf-8'), '👍\n✅\n😛\n')
      fs.unlinkSync(testFilePath) // remove test file
      t.end()
    })
  })

  t.test('it will override txt file with given name, if it does exist', t => {
    writeArrayToTxtFile(['a','b','c'], testFilePath, err => {
      writeArrayToTxtFile(['d', 'e', 'f'], testFilePath, err => {
        t.equal(fs.readFileSync(testFilePath, 'utf-8'), 'd\ne\nf\n')
        fs.unlinkSync(testFilePath) // remove test file
        t.end()
      })
    })
  })
  
})
