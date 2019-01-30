import fs from 'fs';
import path from 'path';

import enoughTimeAgo from '../index';

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
  expect(enoughTimeAgo.modified('./nonFile.html', 10000)).toBeUndefined;
  expect(enoughTimeAgo.created('./nonFile.html', 10000)).toBeUndefined;
  expect(enoughTimeAgo.changed('./nonFile.html', 10000)).toBeUndefined;
  expect(enoughTimeAgo.accessed('./nonFile.html', 10000)).toBeUndefined;
});

test('Enough time ago - false', () => {
  writeFile(path.resolve(__dirname, 'fileFalse.html'), 'test');
  expect(
    enoughTimeAgo.modified(path.resolve(__dirname, 'fileFalse.html'), 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo.created(path.resolve(__dirname, 'fileFalse.html'), 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo.changed(path.resolve(__dirname, 'fileFalse.html'), 10000)
  ).toBeFalsy;
  expect(
    enoughTimeAgo.accessed(path.resolve(__dirname, 'fileFalse.html'), 10000)
  ).toBeFalsy;
  delFile(path.resolve(__dirname, 'fileFalse.html'));
});

test('Enough time ago - true', () => {
  writeFile(path.resolve(__dirname, 'fileTrue.html'), 'test');
  expect(enoughTimeAgo.modified(path.resolve(__dirname, 'fileTrue.html'), 0))
    .toBeTruthy;
  expect(enoughTimeAgo.created(path.resolve(__dirname, 'fileTrue.html'), 0))
    .toBeTruthy;
  expect(enoughTimeAgo.changed(path.resolve(__dirname, 'fileTrue.html'), 0))
    .toBeTruthy;
  expect(enoughTimeAgo.accessed(path.resolve(__dirname, 'fileTrue.html'), 0))
    .toBeTruthy;
  delFile(path.resolve(__dirname, 'fileTrue.html'));
});

test('if enough time ago - true and del - delite file', () => {
  writeFile(path.resolve(__dirname, 'fileTrueDel.html'), 'test');
  expect(
    enoughTimeAgo.modified(path.resolve(__dirname, 'fileTrueDel.html'), 0, true)
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileTrueDel.html'))).toBeFalsy;
  writeFile(path.resolve(__dirname, 'fileTrueDel.html'), 'test');
  expect(
    enoughTimeAgo.created(path.resolve(__dirname, 'fileTrueDel.html'), 0, true)
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileTrueDel.html'))).toBeFalsy;
  writeFile(path.resolve(__dirname, 'fileTrueDel.html'), 'test');
  expect(
    enoughTimeAgo.changed(path.resolve(__dirname, 'fileTrueDel.html'), 0, true)
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileTrueDel.html'))).toBeFalsy;
  writeFile(path.resolve(__dirname, 'fileTrueDel.html'), 'test');
  expect(
    enoughTimeAgo.accessed(path.resolve(__dirname, 'fileTrueDel.html'), 0, true)
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileTrueDel.html'))).toBeFalsy;
});

test('if enough time ago - false and del true - dont delete files', () => {
  writeFile(path.resolve(__dirname, 'fileFalseDel.html'), 'test');
  expect(
    enoughTimeAgo.modified(
      path.resolve(__dirname, 'fileFalseDel.html'),
      10000,
      true
    )
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileFalseDel.html')))
    .toBeTruthy;
  expect(
    enoughTimeAgo.created(
      path.resolve(__dirname, 'fileFalseDel.html'),
      10000,
      true
    )
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileFalseDel.html')))
    .toBeTruthy;
  expect(
    enoughTimeAgo.changed(
      path.resolve(__dirname, 'fileFalseDel.html'),
      10000,
      true
    )
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileFalseDel.html')))
    .toBeTruthy;
  expect(
    enoughTimeAgo.accessed(
      path.resolve(__dirname, 'fileFalseDel.html'),
      10000,
      true
    )
  ).toBeTruthy;
  expect(fs.existsSync(path.resolve(__dirname, 'fileFalseDel.html')))
    .toBeTruthy;
  delFile(path.resolve(__dirname, 'fileFalseDel.html'));
});
