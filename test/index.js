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

test('CLI outputs JSON format', t => {
  const cliOut = path.join(__dirname, 'cli-json.json')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--format', 'json'], err => {
    t.error(err, 'cli executed without error')
    const content = fs.readFileSync(cliOut, 'utf-8')
    const json = JSON.parse(content)
    t.ok(json.root, 'has root property')
    t.ok(json.directories, 'has directories array')
    t.ok(Array.isArray(json.directories), 'directories is array')
    t.true(json.directories.length > 0, 'has directory entries')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI outputs Markdown format', t => {
  const cliOut = path.join(__dirname, 'cli-markdown.md')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--format', 'markdown'], err => {
    t.error(err, 'cli executed without error')
    const content = fs.readFileSync(cliOut, 'utf-8')
    t.ok(content.includes('# Directory Structure'), 'has markdown header')
    t.ok(content.includes('**Root Directory:**'), 'has root directory section')
    t.ok(content.includes('## Directories Found'), 'has directories section')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI outputs Tree format', t => {
  const cliOut = path.join(__dirname, 'cli-tree.txt')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--format', 'tree'], err => {
    t.error(err, 'cli executed without error')
    const content = fs.readFileSync(cliOut, 'utf-8')
    t.ok(content.includes('# Directory Tree'), 'has tree header')
    t.ok(content.includes('├──') || content.includes('└──'), 'has tree symbols')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI outputs CSV format', t => {
  const cliOut = path.join(__dirname, 'cli-csv.csv')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--format', 'csv'], err => {
    t.error(err, 'cli executed without error')
    const content = fs.readFileSync(cliOut, 'utf-8')
    t.ok(content.includes('Path,Relative Path,Depth,Name'), 'has CSV header')
    const lines = content.trim().split('\n')
    t.true(lines.length > 1, 'has data rows')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI progress flag works without errors', t => {
  const cliOut = path.join(__dirname, 'cli-progress.txt')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--progress'], err => {
    t.error(err, 'cli executed without error')
    t.ok(fs.existsSync(cliOut), 'output file created')
    const content = fs.readFileSync(cliOut, 'utf-8')
    t.ok(content.length > 0, 'has content')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI verbose flag works without errors', t => {
  const cliOut = path.join(__dirname, 'cli-verbose.txt')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--verbose'], err => {
    t.error(err, 'cli executed without error')
    t.ok(fs.existsSync(cliOut), 'output file created')
    const content = fs.readFileSync(cliOut, 'utf-8')
    t.ok(content.length > 0, 'has content')
    fs.unlinkSync(cliOut)
    t.end()
  })
})

test('CLI progress works with different formats', t => {
  const cliOut = path.join(__dirname, 'cli-progress-json.json')
  execFile('node', [cli, '--rootdir', testDir, '--writeto', cliOut, '--format', 'json', '--progress'], err => {
    t.error(err, 'cli executed without error')
    t.ok(fs.existsSync(cliOut), 'output file created')
    const content = fs.readFileSync(cliOut, 'utf-8')
    const json = JSON.parse(content)
    t.ok(json.directories, 'has directories array')
    fs.unlinkSync(cliOut)
    t.end()
  })
})
