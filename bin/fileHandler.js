const cp = require('child_process');
const fs = require('fs');
const { dirname } = require('path');
const printer = require('./printer.js');
const TEMPLATES = require('./templates.js');

/**
 * Get the current location where the epger was executed
 * @returns current real path
 */
const getCurrentPath = () => {
  return fs.realpathSync('./');
}

const getUserRootPath = () => {
  return __dirname.split('/').filter((dir, i) => i < 3).join('/');
}

const getTranscationPath = (p) => {
  return `${__dirname}/_transaction${p}`;
}

const createDir = (isTransaction, [p, ]) => {
  const path = isTransaction ? getTranscationPath(p) : p;

  // TODO Exception
  if(fs.existsSync(path)) return;

  printer.createDirectory(p);
  fs.mkdirSync(path);
};

const createEmptyFile = (isTransaction, [p, filename]) => {
  const path = isTransaction ? getTranscationPath(p) : p;

  // TODO Exception
  if(!fs.existsSync(path)) return;

  printer.createEmptyFile(`${p}/${filename}`);
  fs.writeFileSync(`${path}/${filename}`, '');
};

const createTemplateFile = (isTransaction, [p, filename, extension, content]) => {
  const path = isTransaction ? getTranscationPath(p) : p;

  // TODO Exception
  if(!fs.existsSync(path)) return;

  printer.createTemplateFile(extension, `${p}/${filename}.${extension}`)
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
      workQueue.push((isTransaction) => createDir(isTransaction, params));
      break;
    case c.CREATE_EMPTY_FILE:
      workQueue.push((isTransaction) => createEmptyFile(isTransaction, params));
      break;
    case c.CREATE_TEMPLATE_FILE:
      workQueue.push((isTransaction) => createTemplateFile(isTransaction, params));
      break;
  }
};

const qExec = (isTransaction) => {
  if(isTransaction) {
    try {
      fs.mkdirSync(`${__dirname}/_transaction${getCurrentPath()}`, {recursive: true});

      workQueue.forEach(work => work(true));
      
      // If there was no error during transaction,
      // All files in _transaction is moved to target directory.
      cp.execSync(`cp -r ${__dirname}/_transaction${getUserRootPath()}/* ${getUserRootPath()}/`);

      printer.success();
    } catch(err) {
      console.log(err);
    } finally {
      fs.rmSync(`${__dirname}/_transaction`, {recursive: true});
    }
  } else {
    workQueue.forEach(work => work(false));
  }
};

module.exports = {
  getCurrentPath,
  qPush,
  qExec,
  c,
  getTemplate,
};