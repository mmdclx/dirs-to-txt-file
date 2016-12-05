const test = require('tape')
const getAllDirsRecursively = require('../get-all-dirs-recursively')


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

  t.test('it will throw an error if root directory does not exist', t => {
    try {
      getAllDirsRecursively('./this_folder_does_not_exist')
    } catch(ex) {
      t.equal(ex.code, 'ENOENT', 'No such file or directory (POSIX.1)')
    }
    t.end()
  })

})
