/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import buildDiff from '../src/index.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputStructures = ['flat', 'nested'];
const inputFormats = ['json', 'yml', 'ini'];
const outputFormats = ['stylish', 'plain'];
const tests = inputStructures
  .flatMap((inputStructure) => inputFormats
    .flatMap((inputFormat) => outputFormats
      .map((outputFormat) => ([inputStructure, inputFormat, outputFormat]))));

const getFullPath = (dirpath, filename, ext = 'txt') => path
  .join(...dirpath, `${filename}.${ext}`);

const getFixtureDirPath = (...dirs) => [...[__dirname, '..', '__fixtures__'], ...dirs];

const getFixtureFullPath = (inputStructure, format, fixtureType) => {
  if (fixtureType === 'result') {
    const filename = fixtureType + _.capitalize(format);
    return getFullPath(getFixtureDirPath(inputStructure), filename);
  }
  return getFullPath(getFixtureDirPath(inputStructure, format), fixtureType, format);
};

test.each(tests)(
  'buildDiff with %s %s files and with %s output',
  (inputStructure, inputFormat, outputFormat) => {
    const filepathBefore = getFixtureFullPath(inputStructure, inputFormat, 'before');
    const filepathAfter = getFixtureFullPath(inputStructure, inputFormat, 'after');
    const filepathResult = getFixtureFullPath(inputStructure, outputFormat, 'result');

    const diff = buildDiff(filepathBefore, filepathAfter, outputFormat);
    const result = fs.readFileSync(filepathResult, 'utf8');
    expect(diff).toEqual(result);
  },
);
