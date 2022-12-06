const fs = require('fs');
const TEMPLATES = require('./templates.js');

const createDir = ([path, ]) => {
  // TODO Exception
  if(fs.existsSync(path)) return;

  console.log(`# creating directory: ${path}`);
  fs.mkdirSync(path);
};

const createEmptyFile = ([path, filename]) => {
  // TODO Exception
  if(!fs.existsSync(path)) return;

  console.log(`# creating empty file: ${path}/${filename}`);
  fs.writeFileSync(`${path}/${filename}`, '');
};

const createTemplateFile = ([path, filename, extension, content]) => {
  // TODO Exception
  if(!fs.existsSync(path)) return;

  console.log(`# creating .${extension} file: ${path}/${filename}.${extension}`);
  fs.writeFileSync(`${path}/${filename}.${extension}`, content);
};

const c = {
  CREATE_DIR: 0,
  CREATE_EMPTY_FILE: 1,
  CREATE_TEMPLATE_FILE: 2,
};

const getTemplate = (extension) => {
  if(!extension || !TEMPLATES[extension]) return null;
  return TEMPLATES[extension];
}

const workQueue = [];

const qPush = (work, ...params) => {
  switch(work) {
    case c.CREATE_DIR:
      workQueue.push(() => createDir(params));
      break;
    case c.CREATE_EMPTY_FILE:
      workQueue.push(() => createEmptyFile(params));
      break;
    case c.CREATE_TEMPLATE_FILE:
      workQueue.push(() => createTemplateFile(params));
      break;
  }
};

const qExec = () => {
  workQueue.forEach(work => work());
};

module.exports = {
  qPush,
  qExec,
  c,
  getTemplate,
};