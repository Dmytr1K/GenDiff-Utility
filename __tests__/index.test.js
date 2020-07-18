/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('genDiff with flat JSON', async () => {
  const pathBefore = await getFixturePath('before.json');
  const pathAfter = await getFixturePath('after.json');
  const result = await readFile('result.txt');
  const diff = genDiff(pathBefore, pathAfter);
  expect(diff).toEqual(result);
});

test('genDiff with flat YAML', async () => {
  const pathBefore = await getFixturePath('before.yml');
  const pathAfter = await getFixturePath('after.yml');
  const result = await readFile('result.txt');
  const diff = genDiff(pathBefore, pathAfter);
  expect(diff).toEqual(result);
});

test('genDiff with flat INI', async () => {
  const pathBefore = await getFixturePath('before.ini');
  const pathAfter = await getFixturePath('after.ini');
  const result = await readFile('result.txt');
  const diff = genDiff(pathBefore, pathAfter);
  expect(diff).toEqual(result);
});
