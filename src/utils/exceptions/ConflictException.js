//409
//400
const HttpException = require("./HttpException")

class ConflictException extends HttpException {
    constructor(message) {
      super(409, message);
    }
  }
  
  module.exports = ConflictException;