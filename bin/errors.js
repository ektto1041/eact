class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UnknownError extends MyError {
  constructor(where, message) {
    super(`${where}: ${message}`);
  }
}

class InvalidCommandError extends MyError {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  UnknownError,
  InvalidCommandError,
}