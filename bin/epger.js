#! /usr/bin/env node
const fs = require('fs');
const {qPush, qExec, c, getTemplate} = require('./fileHandler.js');

console.log('');
console.log('#======================#');
console.log('# EPGER: Hello, World! #');
console.log('#======================#');
console.log('');

const args = process.argv.slice(2);
console.log(args);

const directoryQueue = ['.'];

let isParams = false;
for(const arg of args) {
  if(arg[0] === '/') {
    // If you type '/' as the first letter,
    // A directory is created.
    qPush(c.CREATE_DIR, `${directoryQueue.join('/')}/${arg.slice(1)}`);
    directoryQueue.push(arg.slice(1));
  } else if(arg === '..') {
    // If you type '..' only,
    // Move to the parent directory.
    if(directoryQueue.length === 1) continue; // But if the current location is './', the command is ignored.
    directoryQueue.pop();
  } else {
    /**
     * Create Files
     */
    const [filename, extension] = arg.split('.');
    const template = getTemplate(extension);
    console.log(template);
    const hasParams = arg[0] === '@';

    if(hasParams && template) {
      // If you type '@' as tje first letter,
      // You will receive the parameters until you encounter @ again.
      // This only occurs when a template exists in EPGER.
    } else {
      // No parameters need.
      // Only one parameter exists. - $0: filename(without extension)
      if(template) {
        // Convert all $0 to filename.
        const content = template.replace(new RegExp(/\$0/, "g"), filename);
        qPush(c.CREATE_TEMPLATE_FILE, directoryQueue.join('/'), filename, extension, content);
      } else {
        // If there is no template in EPGER,
        // EPGER will create "Empty File" that don't need parameter
        qPush(c.CREATE_EMPTY_FILE, directoryQueue.join('/'), arg);
      }
    }
    
    // if(hasParams) {
    //   switch(extension) {
    //     case 'js':
    //     case 'jsx':
    //       console.log(`# creating react script: ${directoryQueue.join('/')}/${arg.slice(1)}`);
    //       fs.writeFileSync(`${directoryQueue.join('/')}/${arg.slice(1)}`, templates.REACT);
    //       break;
    //     default:

    //   }
    // } else {
    //   switch(extension) {
    //     case 'js':
    //     case 'jsx':
    //       console.log(`# creating react script: ${directoryQueue.join('/')}/${arg}`);
    //       // fs.writeFileSync(`${directoryQueue.join('/')}/${arg}`, templates.REACT);

    //       // Read Template
    //       const template = fs.readFileSync('./node_modules/eact/bin/templates/react-template.js').toString();

    //       const reg = new RegExp(/\$0/, "g");
    //       template.replace(reg, arg);
    //       console.log(template.replace(reg, filename));
    //       break;
    //     default:

    //   }
    // }
  }
}

qExec();