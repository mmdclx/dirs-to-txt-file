const test = require('tape')
const fs = require('fs')
const path = require('path')
const { execFile } = require('child_process')

const testDir = path.join(__dirname, 'testDirectory')
const cli = path.join(__dirname, '..', 'bin', 'dirs-to-txt-file')

// Test CLI exclude option

test('CLI respects --exclude option', t => {
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

test('CLI fails for invalid rootdir', t => {
  const cliOut = path.join(__dirname, 'cli-error.txt')
  execFile('node', [cli, '--rootdir', path.join(__dirname, 'does-not-exist'), '--writeto', cliOut], err => {
    t.ok(err, 'process exits with error')
    t.equal(err.code, 1, 'exit code 1')
    t.false(fs.existsSync(cliOut), 'output file not created')
    t.end()
  })
})
