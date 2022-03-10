const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  currentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', currentUser); // возвращает инфо о пользователе (почта и имя)
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(30).required(),
  }),
}), updateUser); // обновляет инфо о пользователе(почта и имя)

module.exports = router;
