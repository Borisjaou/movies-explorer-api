const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const NotFound = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  const id = req.user._id;
  User
    .findById(id)
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => User
  .findByIdAndUpdate(req.user._id, {
    email: req.body.email,
    name: req.body.name,
  }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (!user) {
      throw new NotFound('Данные не найдены');
    } else {
      res.status(200).send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    } else {
      next(err);
    }
  });

// авторизация схема создание токена
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreditails(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.send({ data: user.toJSON() });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  }).status(200).send({ message: 'Токен удален' });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
};
