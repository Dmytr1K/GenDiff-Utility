/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import buildDiff from '../src/index.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const structures = ['flat', 'nested'];
const formats = ['json', 'yml', 'ini'];
const tests = structures.flatMap((structure) => formats.map((format) => [structure, format]));

const getFullPath = (dirpath, filename, ext) => path.join(...dirpath, `${filename}.${ext}`);
const getFixtureFullPath = (subdirs, filename, ext) => {
  const fixtureDirPath = [...[__dirname, '..', '__fixtures__'], ...subdirs];

  return getFullPath(fixtureDirPath, filename, ext);
};

test.each(tests)(
  'buildDiff with %s %s files',
  (structure, format) => {
    const filepathBefore = getFixtureFullPath([structure, format], 'before', format);
    const filepathAfter = getFixtureFullPath([structure, format], 'after', format);
    const filepathResult = getFixtureFullPath([structure], 'result', 'txt');

    const diff = buildDiff(filepathBefore, filepathAfter);
    const result = fs.readFileSync(filepathResult, 'utf8');
    expect(diff).toEqual(result);
  },
);
