class BadRequest extends Error {
  constructor(message) {
    super(message || 'Неверный запрос');
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
