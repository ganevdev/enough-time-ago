import isTooOld from '../index';

test('Nonexistent file - return undefined', () => {
  expect(isTooOld.modified('./nonFile.html', 10000)).toBe(undefined);
});

test('Nonexistent file - return undefined', () => {
  expect(isTooOld.created('./nonFile.html', 10000)).toBe(undefined);
});
