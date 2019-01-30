import fs from 'fs';

import longEnough from '../index';

//
test('Nonexistent file - return undefined', () => {
  expect(longEnough.modified('./nonFile.html', 10000)).toBe(undefined);
});
test('Nonexistent file - return undefined', () => {
  expect(longEnough.created('./nonFile.html', 10000)).toBe(undefined);
});
test('Nonexistent file - return undefined', () => {
  expect(longEnough.changed('./nonFile.html', 10000)).toBe(undefined);
});
test('Nonexistent file - return undefined', () => {
  expect(longEnough.accessed('./nonFile.html', 10000)).toBe(undefined);
});

//
test('new file - return false', () => {
  fs.openSync('./newfile.html', 'a');
  expect(longEnough.created('./newfile.html', 10000)).toBe(false);
});
test('old file - return true', () => {
  fs.openSync('./oldfile.html', 'a');

  expect(longEnough.created('./oldfile.html', 1)).toBe(true);
});
