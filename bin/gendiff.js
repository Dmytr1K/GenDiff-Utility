#!/usr/bin/env node

import { createRequire } from 'module';
import program from 'commander';
import genDiff from '../index.js';

const packageConfig = createRequire(import.meta.url)('../package.json');
const { version, description } = packageConfig;

program
  .version(version)
  .description(description)
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

program.parse(process.argv);
