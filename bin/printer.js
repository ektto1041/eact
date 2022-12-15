const chalk = require('chalk');
const rl = require('readline-sync');

module.exports = {
  introduce: () => {
    console.log('');
    console.log('#===================================#');
    console.log(chalk`#    {bold.rgb(242,0,178) EPGER}: Hello, World!           #`);
    console.log(chalk.italic('#    by Sangyeon Park, ektto1041    #'));
    console.log(chalk.italic('#    since 06/12/2022               #'));
    console.log('#===================================#');
    console.log('');
    console.log('# If you want to know how to use EPGER,')
    console.log('# Please visit: ')
    console.log(chalk.blue('# Github : https://github.com/ektto1041/epger'))
    console.log(chalk.green('# NPM    : https://www.npmjs.com/package/epger'))
    console.log('')
  },
  getCommand: async (path) => {
    console.log();
    console.log(chalk.bgBlackBright(path + ':'));
    const input = rl.question('', );
    return input;
  },
  createDirectory: (path) => {
    console.log(`#   creating directory   : ${chalk.greenBright(path)}`);
  },
  createEmptyFile: (path) => {
    console.log(`#   creating empty file  : ${chalk.greenBright(path)}`);
  },
  createTemplateFile: (extension, path) => {
    console.log(`#   creating ${extension} file   : ${chalk.greenBright(path)}`);
  },
  success: () => {
    console.log();
    console.log('#===========================================#');
    console.log('#                                           #');
    console.log(`#   ${chalk.blueBright('Your package is created successfully!')}   #`);
    console.log('#                                           #');
    console.log('#===========================================#');
    console.log();
  },
  error: (err) => {
    console.log();
    console.log(`# ${chalk.red('ERROR: ' + err.name)}`);
    console.log(`# ${chalk.red(err.message)}`);
    console.log();
  },
  unknownError: (err) => {
    console.log();
    console.log(`# ${chalk.red('ERROR: ' + err.name)}`);
    console.log(`# ${chalk.red(err.message)}`);
    console.log(`# ${chalk.red('If you have some times, please let me know about this unknown error.')}`);
    console.log(`# ${chalk.red('Visit: https://github.com/ektto1041/epger/issues')}`);
    console.log();
  }
}