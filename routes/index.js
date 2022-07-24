const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { validatorLogin, validatorUser } = require('../validate/validate');
const auth = require('../middlewares/auth');

router.post('/signin', validatorLogin, login);
router.post('/signup', validatorUser, createUser);

router.use(auth, require('./users'));
router.use(auth, require('./movies'));
router.use(auth, require('./errRouter'));

module.exports = router;
