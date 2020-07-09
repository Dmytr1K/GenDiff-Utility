import fs from 'fs';
import program from 'commander';
import getDiff from './getDiff.js';

export default () => {
  const version = '0.0.1';
  const description = 'Compares two configuration files and shows a difference.';

  program
    .version(version)
    .description(description);

  program
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format');

  program
    .action((filepath1, filepath2) => {
      const config1 = JSON.parse(fs.readFileSync(filepath1));
      const config2 = JSON.parse(fs.readFileSync(filepath2));
      getDiff(config1, config2);
    });

  program.parse(process.argv);
};
