const { celebrate, Joi } = require('celebrate');
const { Reg } = require('../utils/const');

module.exports.validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validatorUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validatorUPDATEUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validatorPOSTMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string(),
    director: Joi.string(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string(),
    image: Joi.string().pattern(Reg),
    trailerLink: Joi.string().pattern(Reg),
    nameRU: Joi.string(),
    nameEN: Joi.string(),
    thumbnail: Joi.string().pattern(Reg),
    movieId: Joi.number().required(),
  }),
});

module.exports.validatorDELETEMovies = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
