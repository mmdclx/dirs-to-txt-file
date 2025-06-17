# dirs-to-txt-file

`dirs-to-txt-file` is a simple Node.js CLI that recursively scans a directory and outputs all subdirectories to a file in your chosen format (text, JSON, tree view, CSV, or Markdown). The target file will be overwritten if it already exists.

## Install

```bash
npm install -g dirs-to-txt-file
```

## Usage

```bash
dirs-to-txt-file --rootdir PATH --writeto FILE [--format FORMAT] [--progress] [--verbose] [--exclude PATTERN ...] [--excludesecret]
```

**Core Options**

- `--rootdir` – directory to scan. *(required)*
- `--writeto` – output file to create or replace. *(required)*
- `--format` – output format: `txt`, `json`, `tree`, `csv`, `markdown`. *(default: txt)*
- `--exclude` – string match or regex to ignore. Can be used multiple times.
- `--excludesecret` – also exclude hidden `.dotfolders` and `node_modules/`.

**Process Flags**

- `--progress` – show progress during directory scanning
- `--verbose` – show detailed timing and performance information

## Examples

### Basic text output (default)
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.txt --excludesecret
```

Contents of `output.txt`:
```
bin
test
test/testDirectory
test/testDirectory/folderA
test/testDirectory/folderA/folderAA
test/testDirectory/folderB
```

### JSON format for programmatic use
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.json --format json
```

### Tree format for visual hierarchy
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.txt --format tree
```

### Markdown format for documentation
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.md --format markdown
```

### CSV format for analysis
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.csv --format csv
```

### With progress indication
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.txt --progress
```

### With detailed performance stats
```bash
$ dirs-to-txt-file --rootdir ./ --writeto output.txt --verbose
```

## Tests

```bash
npm test
```
