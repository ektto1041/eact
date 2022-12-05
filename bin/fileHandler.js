const fs = require('fs');

const createDir = ([path, ]) => {
  if(fs.existsSync(path)) return;

  console.log(`# creating directory: ${path}`);
  fs.mkdirSync(path);
}

const c = {
  CREATE_DIR: 0,
  CREATE_EMPTY_FILE: 1,
};

const workQueue = [];

const qPush = (work, ...params) => {
  switch(work) {
    case c.CREATE_DIR:
      workQueue.push(() => createDir(params));
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
};