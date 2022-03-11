const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
const signs = require('./signs');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found-error');

router.use(signs);
router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', usersRouter);

router.use((req, res, next) => {
  next(new NotFound());
});

module.exports = router;
