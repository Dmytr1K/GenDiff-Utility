#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';
import { version, description } from '../src/getPackageData.js';

program
  .version(version)
  .description(description)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse(process.argv);
