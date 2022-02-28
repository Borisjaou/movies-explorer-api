const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateUser,
} = require('../controllers/movies');

router.get('/users/me', getUser); // возвращает инфо о пользователе (почта и имя)
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser); // обновляет инфо о пользователе(почта и имя)

module.exports = router;
