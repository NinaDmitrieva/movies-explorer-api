const router = require('express').Router();
const { validatorPOSTMovies, validatorDELETEMovies } = require('../validate/validate');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies); /* возвращает все сохранённые текущим  пользователем фильмы */
router.post('/movies', validatorPOSTMovies, createMovies); /* создаёт фильм */
router.delete('/movies/_id', validatorDELETEMovies, deleteMovies); /* удаляет сохранённый фильм по id */

module.exports = router;
