import fs from 'fs';
import program from 'commander';

export default () => {
  const packageJson = fs.readFileSync('./package.json');
  const version = JSON.parse(packageJson).version || 0;
  const description = JSON.parse(packageJson).description || '';

  program
    .version(version)
    .description(description);

  program.parse(process.argv);
};
