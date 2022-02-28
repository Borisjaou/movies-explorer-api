class ConflictError extends Error {
  constructor(message) {
    super(message || 'Произошел конфликт данных');
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
