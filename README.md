# Is Too Old

This is the node library for working with file date.

```{}
npm i is-too-old
```

Examples with modified (created, changed and accessed - same):

```{js}
const isTooOld = require('is-too-old')

isTooOld.modified('./newFile.html')
// return false, if file newFile.html modified <= 86400000 ms
// by default the millisecond values are 86400000 (one day)

isTooOld.modified('./newFile.html', 10000)
// return false, if file newFile.html modified  <= 10000 ms

isTooOld.modified('./oldFile.html', 10000)
// return true, if file oldFile.html modified > 10000 ms

isTooOld.modified('./nonFile.html', 10000)
// return undefined, if such file does not exist
```
