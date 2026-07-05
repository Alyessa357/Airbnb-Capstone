// Catches errors passed via next(err) and sends a JSON response
const errorHandler = (
  err,
  req,
  res,
  next
) => {

// Use existing status code, or default to 500 if still 200
  const statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  res.status(statusCode).json({
    message: err.message
  });

};

module.exports = {
  errorHandler
};