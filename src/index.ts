import fs from 'fs';

const timeDefault = 86400000;

function timeHasPassed(
  file: string,
  POSIX: number,
  check: 'created' | 'modified' | 'changed' | 'accessed' = 'modified'
): number {
  switch (check) {
    case 'created':
      return POSIX - fs.statSync(file).birthtimeMs;
      break;
    case 'accessed':
      return POSIX - fs.statSync(file).atimeMs;
      break;
    case 'changed':
      return POSIX - fs.statSync(file).ctimeMs;
      break;
    case 'modified':
      return POSIX - fs.statSync(file).mtimeMs;
      break;
  }
}

function enoughTimeAgo(
  file: string,
  check: 'created' | 'modified' | 'changed' | 'accessed' = 'modified',
  time: number = timeDefault
): boolean | undefined {
  if (fs.existsSync(file)) {
    const POSIX = new Date().getTime();
    const fileMs = timeHasPassed(file, POSIX, check);
    if (fileMs > time) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = enoughTimeAgo;
export default enoughTimeAgo;
