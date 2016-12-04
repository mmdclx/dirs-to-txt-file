const test = require('tape')
const getAllDirsRecursively = require('../getAllDirsRecursively')


test('get-all-dirs-recursively', t => {
  const testDir = __dirname + '/testDirectory'
  const dirs = getAllDirsRecursively(testDir)

  t.deepEqual(dirs, [
    `${testDir}/folderA`,
    `${testDir}/folderA/folderAA`,
    `${testDir}/folderB`
  ])

  t.end()

})
