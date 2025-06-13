const test = require('tape')
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const testDir = path.join(__dirname, 'testDirectory')

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
        t.pass()
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

  t.test('it reports an error if the path does not exist', t => {
    const badFilePath = __dirname + '/does/not/exist/test.txt'
    writeArrayToTxtFile(['x'], badFilePath, err => {
      t.ok(err, 'expected error is passed to callback')
      t.end()
    })
  })

  t.test('CLI respects --exclude option', t => {
    const cli = path.join(__dirname, '..', 'bin', 'dirs-to-txt-file')
    const cliOut = path.join(__dirname, 'cli-out.txt')
    execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--exclude', 'folderB'], err => {
      t.error(err, 'cli executed without error')
      const lines = fs.readFileSync(cliOut, 'utf-8').trim().split(/\r?\n/).sort()
      const expected = [
        path.join(testDir, 'folderA'),
        path.join(testDir, 'folderA', 'folderAA')
      ].sort()
      t.deepEqual(lines, expected)
      fs.unlinkSync(cliOut)
      t.end()
    })
  })

  t.test('CLI fails for invalid rootdir', t => {
    const cli = path.join(__dirname, '..', 'bin', 'dirs-to-txt-file')
    const cliOut = path.join(__dirname, 'cli-error.txt')
    execFile('node', [cli, '--rootdir', path.join(__dirname, 'does-not-exist'), '--writeto', cliOut], err => {
      t.ok(err, 'process exits with error')
      t.equal(err.code, 1, 'exit code 1')
      t.false(fs.existsSync(cliOut), 'output file not created')
      t.end()
    })
  })

})
