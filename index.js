#!/usr/bin/env node
let argv = require('yargs')
  .usage(`
Usage: $0 --rootdir path --writeto path/file.txt

Notes:
You can pass multiple exclusion criteria by using --exclude multiple times.

If you want to exclude secret .dotfolders and node_modules/, use the --excludesecret flag.`)
  .demand(['rootdir', 'writeto'])
  .describe('exclude', 'a string match or literal RegExp (don\'t wrap in //)')
  .describe('excludesecret', 'exclude secret .dotfolders and node_modules/')
  .coerce('exclude', arg => {
    if(Array.isArray(arg)) {
      arg.map(v => {
        return new RegExp(v)
      })
      return arg
    } else {
      return RegExp(arg)
    }
  })
  .argv

const isValid = require('is-valid-path')
const getDirs = require('get-dirs')
const writeArrayToTxtFile = require('./write-array-to-txt-file')

if(!isValid(argv.rootdir)) {
  throw new Error('Your rootdir is not a valid path!')
}
if(!isValid(argv.writeto)) {
  throw new Error('Your writeto is not a valid path!')
}

if(typeof argv.exclude === 'undefined') {
  argv.exclude = []
}

if(!Array.isArray(argv.exclude)) {
  argv.exclude = [argv.exclude]
}

if(argv.excludesecret) {
  argv.exclude.push(/^\.\w+|\/\./)
  argv.exclude.push('node_modules')
}

let result = getDirs(argv.rootdir, argv.exclude)

writeArrayToTxtFile(result, argv.writeto, () => {
  console.log(`Successfully wrote to ${argv.writeto}`)
})
