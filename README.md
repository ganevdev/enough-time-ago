# Enough Time Ago

File enough time ago modified/created/changed/accessed or not?

A simple library for checking the "age" of a file or/and how long it has changed. This library uses standard [node fs](https://nodejs.org/api/fs.html) methods, and its purpose is to shorten the code.

```{}
npm i long-enough
```

Examples with modified, same with created, changed and accessed.

```{js}
const enoughTimeAgo = require('enough-time-ago')

enoughTimeAgo.modified('./newFile')
// return false, if file newFile modified less (or exactly 86400000 ms) than one day ago
// by default millisecond values are 86400000 ms (one day)

enoughTimeAgo.modified('./newFile', 10000)
// return false, if file newFile modified less (or exactly 10000 ms) than 10 seconds ago

enoughTimeAgo.modified('./oldFile', 10000)
// return true, if file oldFile modified more than 10 seconds ago

enoughTimeAgo.modified('./nonFile', 10000)
// return undefined, if such file does not exist
```

Delete file if it was last modified more than a 10 seconds ago.
Same with created, changed and accessed.

```{js}
const enoughTimeAgo = require('enough-time-ago')

enoughTimeAgo.modified('./file.html', 10000, true)
// delite './file.html' if this file exist and modified more than 10 seconds ago

```

Example - how to delete all obsolete (older than one day - 86400000 ms) files in a folder:

```{js}
const fs = require('fs')
const enoughTimeAgo = require('enough-time-ago')

const folder = 'folder/';
fs.readdirSync(folder).forEach((file) => {
  enoughTimeAgo.created(folder + '/' + file, 86400000, true);
});
```
