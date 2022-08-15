const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');

const { DB_ADDRESS = 'mongodb://localhost:27017/mestodb', PORT = 3000 } = process.env;
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'https://your-movie-explorer-fr.nomoredomains.work', 'https://api.nomoreparties.co/beatfilm-movies',
  'https://your-movie-explorer.nomoredomains.work',
];

const app = express();
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
/* eslint no-console: ["error", { allow: [log] }] */
app.listen(PORT, () => console.log(`Сервер запущен успешно. Порт ${PORT}`));
