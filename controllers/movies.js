const BadRequest = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden-error');
const NotFound = require('../errors/not-found-error');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(new NotFound('Данные не найдены'))
  .then((movie) => {
    const owner = String(movie.owner);
    const userId = String(req.user._id);
    if (owner !== userId) {
      throw new Forbidden('Вы не можете удалять чужие карточки');
    } else {
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest({ message: 'Ошибка Id' }));
    } else {
      next(err);
    }
  });

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
