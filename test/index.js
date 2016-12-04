const test = require('tape')
const getAllDirsRecursively = require('../getAllDirsRecursively')


test('get-all-dirs-recursively', t => {

  const testDir = __dirname + '/testDirectory'


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

})
