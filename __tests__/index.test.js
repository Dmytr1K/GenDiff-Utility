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

const exts = ['json', 'yml', 'ini'];
const fixturesDirPath = [__dirname, '..', '__fixtures__'];

const getFullPath = (dirpath, filename, ext) => path.join(...dirpath, `${filename}.${ext}`);
const getFixturePath = (filename, ext) => getFullPath(fixturesDirPath, filename, ext);

test.each(exts)('genDiff with flat %s', (ext) => {
  const before = getFixturePath('before', ext);
  const after = getFixturePath('after', ext);
  const result = fs.readFileSync(getFixturePath('result', 'txt'), 'utf8');

  const diff = genDiff(before, after);
  expect(diff).toEqual(result);
});
