const test = require('tape')
const fs = require('fs')
const getAllDirsRecursively = require('../get-all-dirs-recursively')

const testDir = __dirname + '/testDirectory'

test('get-all-dirs-recursively', t => {

  t.test('it will return, in an array, only directories', t => {

    const dirs = getAllDirsRecursively(testDir)

    t.deepEqual(dirs, [
      `${testDir}/folderA`,
      `${testDir}/folderA/folderAA`,
      `${testDir}/folderB`
    ])
    t.end()
  })

  t.test('it will throw an error if no root directory is given', t => {

    t.throws(getAllDirsRecursively, Error)
    t.end()
  })

  t.test('it will throw an error if root directory does not exist', t => {
    try {
      getAllDirsRecursively('./this_folder_does_not_exist')
    } catch(ex) {
      t.equal(ex.code, 'ENOENT')
    }
    t.end()
  })

})

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
