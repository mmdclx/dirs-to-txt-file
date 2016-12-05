#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

module.exports = function getAllDirsRecursively(rootDir) {
  if(typeof rootDir === 'undefined') {
    throw new Error('Please provide a root directory.')
  }
  let dirs = [];

  (function readDir(dir) {
    let files = fs.readdirSync(dir)

    files.map(file => {
      return path.join(dir, file)
    }).filter(file => {
      return fs.statSync(file).isDirectory()
    }).forEach(foundDir => {
      dirs.push(foundDir)
      readDir(foundDir)
    })
  })(rootDir)

  return dirs
}
