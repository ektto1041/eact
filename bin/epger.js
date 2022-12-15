#! /usr/bin/env node
const {program} = require('commander');
const { commandEpger } = require('./commandEpger.js');
const { InvalidCommandError, UnknownError } = require('./errors.js');
const {linearEpger} = require('./linearEpger.js');
const printer = require('./printer.js');

program.name('EPGER').version('0.0.4').description('Easy Package manaGER');

program
.option('-l, --linear <command...>', 'construct package with a line')
.option('-n, --no-transaction', 'execute without transaction (it is not work in linear epger)')
.action((opts) => {
  printer.introduce();

  const linearOption = opts.linear;
  try {
    if(linearOption) linearEpger(linearOption);
    else {
      const isTransaction = opts.transaction;
      commandEpger(isTransaction);
    }
  } catch(err) {
    if(err instanceof InvalidCommandError) {
      printer.error(err);
    } else if(err instanceof UnknownError) {
      printer.unknownError(err);
    }
  }
  
});

program.parse();