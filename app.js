const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const { mongodbURL, PORT } = require('./utils/config');
const limiter = require('./middlewares/limiter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(cors({ credentials: true, origin: ['https://localhost:3000', 'http://localhost:3000', 'http://api.getmovies.nomoredomains.xyz', 'https://api.getmovies.nomoredomains.xyz'] }));
app.use(limiter);
app.use(require('./routes/index'));

mongoose.connect(mongodbURL, { useNewUrlParser: true, family: 4 });
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT);
