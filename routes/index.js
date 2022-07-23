const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validatorLogin, validatorUser } = require('../validate/validate');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validatorLogin, login);
router.post('/signup', validatorUser, createUser);

router.use(auth, require('./users'));
router.use(auth, require('./movies'));

router.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
