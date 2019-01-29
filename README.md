# Too Old File

This is the node library for working with obsolete files. The basic idea is that to detect the age of files, you need to specify the file age in milliseconds (and NOT how many milliseconds since January 1, 1970).

Examples:

```{js}
const tooOld = require('too-old')

tooOld.is('./newFile.html', 10000)
// return false

tooOld.is('./oldFile.html', 10000)
// return true

tooOld.is('./nonExFile.html', 10000)
// return undefined, if such file does not exist

tooOld.is('./newFile.html')
// return true
// by default the millisecond values are 86400000 (one day)
```

```{js}
const tooOld = require('too-old')

tooOld.del('./oldFile.html', 10000)
// delete the specified file if it is old enough
```

```{js}
const tooOld = require('too-old')

tooOld.delAll('./folder', 10000)
// delete ALL old files in the folder
```