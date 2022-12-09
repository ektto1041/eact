#! /usr/bin/env node
const {program} = require('commander');
const { commandEpger } = require('./commandEpger.js');
const {linearEpger} = require('./linearEpger.js');
const printer = require('./printer.js');

program.name('EPGER').version('0.0.4').description('Easy Package manaGER');

program
.option('-l, --linear <command...>', 'construct package with a line')
.option('-n, --no-transaction', 'execute without transaction (it is not work in linear epger)')
.action((opts) => {
  printer.introduce();

  const linearOption = opts.linear;
  if(linearOption) linearEpger(linearOption);
  else {
    const isTransaction = opts.transaction;
    commandEpger(isTransaction);
  }
});

program.parse();