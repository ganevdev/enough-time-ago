import fs from 'fs';

const timeDefault = 86400000;

// created
function created(
  file: string,
  time: number = timeDefault
): boolean | undefined {
  if (fs.existsSync(file)) {
    const POSIX = new Date().getTime();
    const fileBirthtimeMs = POSIX - fs.statSync(file).birthtimeMs;
    if (fileBirthtimeMs > time) {
      return true;
    } else {
      return false;
    }
  }
}

// modified
function modified(
  file: string,
  time: number = timeDefault
): boolean | undefined {
  if (fs.existsSync(file)) {
    const POSIX = new Date().getTime();
    const fileMtimeMs = POSIX - fs.statSync(file).mtimeMs;
    if (fileMtimeMs > time) {
      return true;
    } else {
      return false;
    }
  }
}

// changed
function changed(
  file: string,
  time: number = timeDefault
): boolean | undefined {
  if (fs.existsSync(file)) {
    const POSIX = new Date().getTime();
    const fileCtimeMs = POSIX - fs.statSync(file).ctimeMs;
    if (fileCtimeMs > time) {
      return true;
    } else {
      return false;
    }
  }
}

// accessed
function accessed(
  file: string,
  time: number = timeDefault
): boolean | undefined {
  if (fs.existsSync(file)) {
    const POSIX = new Date().getTime();
    const fileAtimeMs = POSIX - fs.statSync(file).atimeMs;
    if (fileAtimeMs > time) {
      return true;
    } else {
      return false;
    }
  }
}

// export all
export default { created, modified, changed, accessed };