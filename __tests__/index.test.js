/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import _ from 'lodash';
import genDiff from '../index.js';

// Create equivalents of __filename and __dirname
// https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename, ext) => path
  .join(__dirname, '..', '__fixtures__', `${filename}.${ext}`);

const getExpectedResult = (outputFormatterType) => {
  const expectedResultFileName = `result${_.capitalize(outputFormatterType)}`;
  const expectedResultFilePath = getFixturePath(expectedResultFileName, 'txt');

  return fs.readFileSync(expectedResultFilePath, 'utf-8');
};

const inputDataTypes = ['json', 'yml', 'ini'];
const outputFormatterTypes = ['stylish', 'plain', 'json'];
const getTestsSet = (types1, types2) => types1
  .flatMap((type1) => types2
    .map((type2) => ([type1, type2])));

test.each(getTestsSet(inputDataTypes, outputFormatterTypes))(
  'genDiff read %s files and generate %s format output',
  (inputDataType, outputFormatterType) => {
    const filepathBefore = getFixturePath('before', inputDataType);
    const filepathAfter = getFixturePath('after', inputDataType);
    const currentResult = genDiff(filepathBefore, filepathAfter, outputFormatterType);

    const expectedResult = getExpectedResult(outputFormatterType);

    expect(currentResult).toEqual(expectedResult);
  },
);
