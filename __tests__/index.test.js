import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(currentDirectory, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiff', async () => {
  const pathBefore = await getFixturePath('before.json');
  const pathAfter = await getFixturePath('after.json');
  const result = await readFile('result.txt');
  const diff = genDiff(pathBefore, pathAfter);
  expect(diff).toEqual(result);
});
