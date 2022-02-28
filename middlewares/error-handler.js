const errorHandler = (err, req, res, next) => {
  const message = err.message || 'На сервере произошла ошибка';
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
