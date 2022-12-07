#! /usr/bin/env node
const {program} = require('commander');
const {linearEpger} = require('./linearEpger.js');

program.name('EPGER').version('0.0.4').description('Easy Package manaGER');

program.option('-l, --linear <command...>', 'construct package with a line').action((opts) => {
  const args = opts.linear;
  if(args) linearEpger(args);
  else {
    console.log('');
    console.log('#=============================#');
    console.log('# EPGER: Hello, World!        #');
    console.log('# by Sangyeon Park, ektto1041 #');
    console.log('# since 06/12/2022            #');
    console.log('#=============================#');
    console.log('');
    console.log('# If you want to know how to use EPGER,')
    console.log('# Please visit: ')
    console.log('# Github: https://github.com/ektto1041/epger')
    console.log('# NPM: https://www.npmjs.com/package/epger')
    console.log('')
  }
});

program.parse();




// const args = process.argv.slice(2);

// // If no args, EPGER will show how to use.
// const hasNoArgs = args.length === 0;
// if(hasNoArgs) {

// }

