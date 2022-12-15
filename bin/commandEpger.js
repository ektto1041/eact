const printer = require("./printer");

const commandEpger = (isTransaction) => {
  const directoryQueue = getCurrentPath().split('/');

  while(true) {
    const cmd = printer.getCommand(directoryQueue.join('/'));

  }
};

module.exports = { commandEpger };