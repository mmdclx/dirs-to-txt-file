const path = require('path')

function formatTxt(dirPath) {
  return dirPath + '\n'
}

function formatJson(allDirs, rootDir) {
  const structure = {
    root: rootDir,
    generated: new Date().toISOString().split('T')[0],
    directories: allDirs.map(dir => ({
      path: dir,
      relative: path.relative(rootDir, dir),
      depth: dir.split(path.sep).length - rootDir.split(path.sep).length
    }))
  }
  return JSON.stringify(structure, null, 2)
}

function formatTree(allDirs, rootDir) {
  const tree = {}
  
  allDirs.forEach(dir => {
    const relativePath = path.relative(rootDir, dir)
    const parts = relativePath.split(path.sep).filter(p => p)
    
    let current = tree
    parts.forEach(part => {
      if (!current[part]) {
        current[part] = {}
      }
      current = current[part]
    })
  })
  
  function renderTree(obj, indent = '') {
    let result = ''
    const keys = Object.keys(obj).sort()
    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1
      const prefix = isLast ? '└── ' : '├── '
      const nextIndent = indent + (isLast ? '    ' : '│   ')
      
      result += indent + prefix + key + '\n'
      result += renderTree(obj[key], nextIndent)
    })
    return result
  }
  
  return `# Directory Tree\n\n## Root: ${path.basename(rootDir)}\n\n${renderTree(tree)}`
}

function formatCsv(allDirs, rootDir) {
  let csv = 'Path,Relative Path,Depth,Name\n'
  
  allDirs.forEach(dir => {
    const relativePath = path.relative(rootDir, dir)
    const depth = dir.split(path.sep).length - rootDir.split(path.sep).length
    const name = path.basename(dir)
    
    csv += `"${dir}","${relativePath}",${depth},"${name}"\n`
  })
  
  return csv
}

function formatMarkdown(allDirs, rootDir) {
  let md = `# Directory Structure\n\n`
  md += `**Root Directory:** \`${rootDir}\`  \n`
  md += `**Generated:** ${new Date().toISOString().split('T')[0]}\n\n`
  md += `## Directories Found\n\n`
  
  allDirs.forEach((dir, index) => {
    const relativePath = path.relative(rootDir, dir)
    md += `${index + 1}. \`${relativePath}\`\n`
  })
  
  md += `\n---\n*Generated with dirs-to-txt-file*\n`
  
  return md
}

module.exports = {
  formatTxt,
  formatJson,
  formatTree,
  formatCsv,
  formatMarkdown
}