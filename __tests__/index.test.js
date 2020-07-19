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

const structureTypes = ['flat'];
const extensions = ['json', 'yml', 'ini'];
const testMatrix = structureTypes.flatMap((type) => extensions.map((ext) => [type, ext]));

const getFullPath = (dirpath, filename, ext) => path.join(...dirpath, `${filename}.${ext}`);
const getFixtureFullPath = (subdirs, filename, ext) => {
  const fixturesPath = [...[__dirname, '..', '__fixtures__'], ...subdirs];
  return getFullPath(fixturesPath, filename, ext);
};

test.each(testMatrix)(
  'genDiff with %s %s',
  (type, ext) => {
    const pathBefore = getFixtureFullPath([type, ext], 'before', ext);
    const pathAfter = getFixtureFullPath([type, ext], 'after', ext);
    const pathResult = getFixtureFullPath([type], 'result', 'txt');

    const diff = genDiff(pathBefore, pathAfter);
    const result = fs.readFileSync(pathResult, 'utf8');
    expect(diff).toEqual(result);
  },
);
