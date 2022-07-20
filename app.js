require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validatorLogin, validatorUser } = require('./validate/validate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const { mongodbURL } = require('./utils/const');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
// app.use(cors({ credentials: true, origin: [
//   'https://localhost:3000',
//   'http://api.movies-explorer-api',
//   'https://api.movies-explorer-api'
// ] })); /*не забудь добавить актуальные ссылки */

app.post('/signup', validatorLogin, login);
app.post('/signin', validatorUser, createUser);

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

mongoose.connect(mongodbURL, { useNewUrlParser: true, family: 4 });
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
