class Unauthorized extends Error {
  constructor(message) {
    super(message || 'Доступ запрещен');
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
