# dirs-to-txt-file

cli node app that takes in a root directory and will write out all 
subdirectories to a text file, formatting each directory on a new line.

Please note this app will override the file specified at --writeto.

## Install
    $ npm install -g dirs-to-txt-file

```
Usage: dirs-to-txt-file --rootdir path --writeto path/file.txt

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

    dirs-to-txt-file --rootdir ./ --writeto output.txt --excludesecret

Contents of output.txt:
```
bin
test
test/testDirectory
test/testDirectory/folderA
test/testDirectory/folderA/folderAA
test/testDirectory/folderB
```
***

    dirs-to-txt-file --rootdir ./ --writeto output.txt --excludesecret --exclude "folderA"

Contents of output.txt:
```
bin
test
test/testDirectory
test/testDirectory/folderB
```

## Unit tests

    $ npm test
