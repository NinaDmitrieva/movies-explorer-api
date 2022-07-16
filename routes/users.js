const router = require('express').Router();
const {
  getUserInfo,
  updateUser,
 } = require('../controllers/users');

router.get('/users/me', getUserInfo); /*возвращает информацию о пользователе(email и имя) */
router.patch('/users/me', updateUser); /*обновляет информацию о пользователе(email и имя) */

module.exports = router;