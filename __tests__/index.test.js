/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import genDiff from '../index.js';
import { readFile } from '../src/utils.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getTestsSet = (items1, items2) => items1.flatMap((item1) => items2
  .map((item2) => ([item1, item2])));

const getFixturePath = (filename, ext) => path
  .join(__dirname, '..', '__fixtures__', `${filename}.${ext}`);

const getExpectedResultData = (outputFormatterType) => {
  const expectedResultFileName = `result${_.capitalize(outputFormatterType)}`;

  return readFile(getFixturePath(expectedResultFileName, 'txt'));
};

const inputDataTypes = ['json', 'yml', 'ini'];
const outputFormatterTypes = ['stylish', 'plain', 'json'];
const testsSet = getTestsSet(inputDataTypes, outputFormatterTypes);

test.each(testsSet)(
  'genDiff read %s files and generate %s format output',
  (inputDataType, outputFormatterType) => {
    const filepathBefore = getFixturePath('before', inputDataType);
    const filepathAfter = getFixturePath('after', inputDataType);
    const expectedResult = getExpectedResultData(outputFormatterType);

    const currentResult = genDiff(filepathBefore, filepathAfter, outputFormatterType);
    expect(currentResult).toEqual(expectedResult);
  },
);
