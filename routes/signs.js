const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login,
  logout,
  createUser,
} = require('../controllers/users');

router.post('/sign-up', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), createUser);
router.post('/sign-in', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.get('/sign-out', logout);

module.exports = router;
