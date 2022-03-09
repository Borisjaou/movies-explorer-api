const express = require('express');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');

const { DB_ADDRESS = 'mongodb://localhost:27017/mestodb', PORT = 3000 } = process.env;
const {
  createUser,
  login,
  logout,
} = require('./controllers/users');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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
  origin: 'myHttpFrontAdress',
  credentials: true,
}));
app.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), createUser);
app.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.get('/sign-out', logout);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
/* eslint no-console: ["error", { allow: [log] }] */
app.listen(PORT, () => console.log(`Сервер запущен успешно. Порт ${PORT}`));
