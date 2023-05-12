const {HttpException} = require('./exceptions');

const asyncWrap =
  (func) => (req, res, next) => func(req, res, next).catch((error) => next(error));


// global error handling mw
function globalErrorHandler(error, req, res, next) {
    if (res.headersSent) {
      // Delegating to built-in error handler
      return next(error);
    }
    console.log(error);
  
    // This is my custom error
    if (error instanceof HttpException) {
      return res.status(error.body.statusCode).send({message: error.body.message});
    }
  
    //any unhandled error 
    res.status(500).send({message: error.message});
}

module.exports = {
  globalErrorHandler,
  asyncWrap
};
  