# write-dirs-to-txt-file

cli node app that takes in a root directory and will write out all 
subdirectories to a text file, formatting each directory on a new line.

```bash

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
