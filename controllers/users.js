const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const AuthError = require('../errors/AuthError');
const BadReqError = require('../errors/BadReqError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadReqError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой пользователь уже существует');
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
          .then((userData) => res.send({
            name: userData.name,
            email: userData.email,
          }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadReqError('Введены некорректные данные'));
            }
            if (err.code === 11000) {
              next(new ConflictError('Такой пользователь уже существует)'));
            }
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};
