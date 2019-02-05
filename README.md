# Enough Time Ago

[![Build Status](https://travis-ci.com/Ganevru/enough-time-ago.svg?branch=master)](https://travis-ci.com/Ganevru/enough-time-ago)
[![npm](https://img.shields.io/npm/v/enough-time-ago.svg?style=flat-square)](http://npm.im/enough-time-ago)

A [node js](https://nodejs.org/) library for checking how much time has passed since file was modified, changed, created or accessed. Always returns true, false or undefined (if file does not exist).

This library uses [node fs](https://nodejs.org/api/fs.html) methods, and its purpose is to shorten the code.

```{}
npm i enough-time-ago
```

Examples with modified, same with created, changed or accessed.

```{js}
const enoughTimeAgo = require('enough-time-ago')

enoughTimeAgo('./newFile', 'modified', 10000)
// return false, if file newFile modified less (or exactly 10000 ms) than 10 seconds ago

enoughTimeAgo('./oldFile', 'modified', 10000)
// return true, if file oldFile modified more than 10 seconds ago

enoughTimeAgo('./nonFile', 'modified', 10000)
// return undefined, if such file does not exist

enoughTimeAgo('./newFile')
// return false, if file newFile modified less (or exactly 86400000 ms) than one day ago
// by default millisecond values are 86400000 ms (one day) and modified are default check
```

Delete file if it was last modified more than a 10 seconds ago.
Same with created, changed and accessed.

```{js}
const enoughTimeAgo = require('enough-time-ago')
const fs = require('fs');

if (enoughTimeAgo('./file.html', 'modified', 10000)) {
  fs.unlinkSync('./file.html');
}
// delite './file.html' if this file modified more than 10 seconds ago
```

Example - how to delete all obsolete (older than one day - 86400000 ms) files in a folder:

```{js}
const fs = require('fs')
const enoughTimeAgo = require('enough-time-ago')

const folder = 'somefolder';
fs.readdirSync(folder).forEach((file) => {
  if (enoughTimeAgo(folder + '/' + file, 'created', 86400000)) {
    fs.unlinkSync(folder + '/' + file);
  }
});
// delite all older than 86400000 ms files in a folder
```
