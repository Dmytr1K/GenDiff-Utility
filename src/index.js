import fs from 'fs';
import program from 'commander';
import getDiff from './getDiff.js';

export default () => {
  const packageJson = fs.readFileSync('./package.json');
  const version = JSON.parse(packageJson).version || 0;
  const description = JSON.parse(packageJson).description || '';

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
