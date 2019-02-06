import fs from 'fs';
import path from 'path';
import enoughTimeAgo from '../index';
// const enoughTimeAgo = require('../index');
const timeHasPassed = require('../index');

function writeFile(file: string, value: string): void {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, value);
  }
}
function delFile(file: string): void {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

test('Nonexistent file - return undefined', () => {
  expect(enoughTimeAgo('./nonFile.html', 'modified', 10000)).toBeUndefined;
  expect(enoughTimeAgo('./nonFile.html', 'created', 10000)).toBeUndefined;
  expect(enoughTimeAgo('./nonFile.html', 'changed', 10000)).toBeUndefined;
  expect(enoughTimeAgo('./nonFile.html', 'accessed', 10000)).toBeUndefined;
});

test('Enough time ago - false', () => {
  writeFile(path.resolve(__dirname, 'fileFalse.html'), 'test');
  expect(
    enoughTimeAgo(path.resolve(__dirname, 'fileFalse.html'), 'modified', 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo(path.resolve(__dirname, 'fileFalse.html'), 'created', 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo(path.resolve(__dirname, 'fileFalse.html'), 'changed', 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo(path.resolve(__dirname, 'fileFalse.html'), 'accessed', 10000)
  ).toBeFalsy;
  delFile(path.resolve(__dirname, 'fileFalse.html'));
});

test('Enough time ago - true', () => {
  writeFile(path.resolve(__dirname, 'fileTrue.html'), 'test');
  expect(enoughTimeAgo(path.resolve(__dirname, 'fileTrue.html'), 'modified', 0))
    .toBeTruthy;
  expect(enoughTimeAgo(path.resolve(__dirname, 'fileTrue.html'), 'created', 0))
    .toBeTruthy;
  expect(enoughTimeAgo(path.resolve(__dirname, 'fileTrue.html'), 'changed', 0))
    .toBeTruthy;
  expect(enoughTimeAgo(path.resolve(__dirname, 'fileTrue.html'), 'accessed', 0))
    .toBeTruthy;
  delFile(path.resolve(__dirname, 'fileTrue.html'));
});

test('timeHasPassed fun', () => {
  writeFile(path.resolve(__dirname, 'fileWriteFile.html'), 'test');
  const POSIX = new Date().getTime();
  expect(
    timeHasPassed(
      path.resolve(__dirname, 'fileWriteFile.html'),
      POSIX,
      'modified'
    )
  ).toBeDefined;
  delFile(path.resolve(__dirname, 'fileWriteFile.html'));
});
