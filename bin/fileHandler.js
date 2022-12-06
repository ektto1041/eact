const fs = require('fs');

const createDir = ([path, ]) => {
  // TODO Exception
  if(fs.existsSync(path)) return;

  console.log(`# creating directory: ${path}`);
  fs.mkdirSync(path);
}

const createEmptyFile = ([path, filename]) => {
  // TODO Exception
  if(!fs.existsSync(path)) return;

  console.log(`# creating empty file: ${path}/${filename}`);
  fs.writeFileSync(`${path}/${filename}`, '');
}

const c = {
  CREATE_DIR: 0,
  CREATE_EMPTY_FILE: 1,
};

const getTemplate = (extension) => {
  if(!extension || !fs.existsSync(`./node_modules/eact/bin/templates/${extension}-template.js`)) return null;
  return fs.readFileSync(`./node_modules/eact/bin/templates/${extension}-template.js`).toString();
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
  }
}

const qExec = () => {
  workQueue.forEach(work => work());
};

module.exports = {
  qPush,
  qExec,
  c,
  getTemplate,
};