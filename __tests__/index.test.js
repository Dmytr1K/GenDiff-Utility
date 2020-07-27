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
const outputFormats = ['stylish', 'plain', 'json'];
const tests = inputStructures
  .flatMap((inputStructure) => inputFormats
    .flatMap((inputFormat) => outputFormats
      .map((outputFormat) => ([inputStructure, inputFormat, outputFormat]))));

const getFixturePath = (dir, filename, ext = 'txt') => path
  .join(__dirname, '..', '__fixtures__', dir, `${filename}.${ext}`);

const getPath = (inputStructure, format, fixtureType) => {
  if (fixtureType === 'result') {
    return getFixturePath(inputStructure, fixtureType + _.capitalize(format));
  }
  return getFixturePath(inputStructure, fixtureType, format);
};

test.each(tests)(
  'buildDiff with %s %s files and with %s output',
  (inputStructure, inputFormat, outputFormat) => {
    const filepathBefore = getPath(inputStructure, inputFormat, 'before');
    const filepathAfter = getPath(inputStructure, inputFormat, 'after');
    const filepathResult = getPath(inputStructure, outputFormat, 'result');

    const diff = buildDiff(filepathBefore, filepathAfter, outputFormat);
    const result = fs.readFileSync(filepathResult, 'utf8');
    expect(diff).toEqual(result);
  },
);
