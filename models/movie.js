const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Укажите страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Укажите режиссёра фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Укажите продолжительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Укажите год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Укажите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Укажите ссылку на постер фильма'],
    validate: validateURL,
  },
  trailer: {
    type: String,
    required: [true, 'Укажите ссылку на трейлер фильма'],
    validate: validateURL,
  },
  thumbnail: {
    type: String,
    required: [true, 'Укажите ссылку на минипостер фильма'],
    validate: validateURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: { /* id фильма, который содержится в ответе сервиса MoviesExplorer.Обязательное поле. */
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Укажите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Укажите название фильма  на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
