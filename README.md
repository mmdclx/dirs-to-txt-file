# dirs-to-txt-file

cli node app that takes in a root directory and will write out all 
subdirectories to a text file, formatting each directory on a new line.

Please note this app will override the file specified at --writeto.

```
Usage: ./index.js --rootdir path --writeto path/file.txt

Notes:
You can pass multiple exclusion criteria by using --exclude multiple times.

If you want to exclude secret .dotfolders and node_modules/, use the
--excludesecret flag.

Options:
  --exclude        a string match or literal RegExp (don't wrap in //)
  --excludesecret  exclude secret .dotfolders and node_modules/
  --rootdir                                                           [required]
  --writeto                                                           [required]

```

## Examples

    ./index.js --rootdir ./ --writeto output.txt --excludesecret

Contents of output.txt:
```
test
test/testDirectory
test/testDirectory/folderA
test/testDirectory/folderA/folderAA
test/testDirectory/folderB
```
***

    ./index.js --rootdir ./ --writeto output.txt --excludesecret --exclude "folderA"

Contents of output.txt:
```
test
test/testDirectory
test/testDirectory/folderB
```
