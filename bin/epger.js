#! /usr/bin/env node

const fs = require('fs');
const {qPush, qExec, c} = require('./fileHandler.js');

console.log('');
console.log('###');
console.log('Easy rEACT: init');
console.log('###');
console.log('');

const args = process.argv.slice(2);
console.log(args);

const directoryQueue = ['.'];

let isParams = false;
for(const arg of args) {
  if(arg[0] === '/') {
    qPush(c.CREATE_DIR, `${directoryQueue.join('/')}/${arg.slice(1)}`);
    directoryQueue.push(arg.slice(1));
  } else if(arg === '..') {
    if(directoryQueue.length === 1) continue;
    directoryQueue.pop();
  } else {
    const [filename, extension] = arg.split('.');

    if(!extension) {
      // No extension -> create empty file
      console.log(`# creating empty file: ${directoryQueue.join('/')}/${arg}`);
      fs.writeFileSync(`${directoryQueue.join('/')}/${arg}`, '');
      continue;
    }

    const hasParams = arg[0] === '@';
    if(hasParams) {
      switch(extension) {
        case 'js':
        case 'jsx':
          console.log(`# creating react script: ${directoryQueue.join('/')}/${arg.slice(1)}`);
          fs.writeFileSync(`${directoryQueue.join('/')}/${arg.slice(1)}`, templates.REACT);
          break;
        default:

      }
    } else {
      switch(extension) {
        case 'js':
        case 'jsx':
          console.log(`# creating react script: ${directoryQueue.join('/')}/${arg}`);
          // fs.writeFileSync(`${directoryQueue.join('/')}/${arg}`, templates.REACT);

          // Read Template
          const template = fs.readFileSync('./node_modules/eact/bin/templates/react-template.js').toString();

          const reg = new RegExp(/\$0/, "g");
          template.replace(reg, arg);
          console.log(template.replace(reg, filename));
          break;
        default:

      }
    }
  }
}

qExec();