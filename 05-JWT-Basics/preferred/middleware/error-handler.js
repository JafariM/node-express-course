const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  
if (err.statusCode) {
    // Custom errors with statusCode
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Default to 500 for unexpected errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Something went wrong, please try again later.',
  });
};

module.exports = errorHandlerMiddleware;
