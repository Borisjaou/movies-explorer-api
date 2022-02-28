const router = require('express').Router();
const usersRouter = require('./users');
const movieRouter = require('./movies');
// const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found-error');

// router.use(auth);
router.use('/movies', movieRouter);
router.use('/users', usersRouter);

router.use((req, res, next) => {
  next(new NotFound());
});

module.exports = router;
