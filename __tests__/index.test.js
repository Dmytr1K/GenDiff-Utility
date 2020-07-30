/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import buildDiff from '../index.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFormats = ['json', 'yml', 'ini'];
const outputFormats = ['stylish', 'plain', 'json'];
const tests = inputFormats.flatMap((inputFormat) => outputFormats
  .map((outputFormat) => ([inputFormat, outputFormat])));

const getFixturePath = (filename, ext = 'txt') => path
  .join(__dirname, '..', '__fixtures__', `${filename}.${ext}`);

const getPath = (format, fixtureType) => {
  if (fixtureType === 'result') {
    return getFixturePath(fixtureType + _.capitalize(format));
  }
  return getFixturePath(fixtureType, format);
};

test.each(tests)(
  'buildDiff read %s files and generate %s format output',
  (inputFormat, outputFormat) => {
    const filepathBefore = getPath(inputFormat, 'before');
    const filepathAfter = getPath(inputFormat, 'after');
    const filepathResult = getPath(outputFormat, 'result');

    const diff = buildDiff(filepathBefore, filepathAfter, outputFormat);
    const result = fs.readFileSync(filepathResult, 'utf8');
    expect(diff).toEqual(result);
  },
);
