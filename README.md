# dirs-to-txt-file

`dirs-to-txt-file` is a simple Node.js CLI that lists every subdirectory under a chosen root directory and writes the result to a text file (one path per line). The target file will be overwritten if it already exists.

## Install

```bash
npm install -g dirs-to-txt-file
```

## Usage

```bash
dirs-to-txt-file --rootdir PATH --writeto FILE [--exclude PATTERN ...] [--excludesecret]
```

**Options**

- `--rootdir` – directory to scan. *(required)*
- `--writeto` – output file to create or replace. *(required)*
- `--exclude` – string match or regex to ignore. Can be used multiple times.
- `--excludesecret` – also exclude hidden `.dotfolders` and `node_modules/`.

## Example

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

## Tests

```bash
npm test
```
