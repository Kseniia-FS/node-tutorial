const asyncHandler = (cbFunction) => (req, res, next) => {
  return Promise.resolve(cbFunction(req, res, next)).catch(next);
};

module.exports = asyncHandler;
