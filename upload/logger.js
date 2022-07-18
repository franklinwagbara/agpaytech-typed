const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("Login", "use logged in");
  }
}

module.exports = Logger;
