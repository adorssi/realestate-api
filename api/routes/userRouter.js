const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listAll);
router.get('/:id', userController.getOne);
router.get('/confirm/:token', userController.accountConfirm);

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/olvide-password', userController.olvidePassword);
router.get('/password-reset/:token', userController.tokenValidator);
router.post('/password-reset/:token', userController.passwordReset);

router.patch('/:id', userController.update);
router.delete('/h/:id', userController.hardDelete);
router.delete('/s/:id', userController.softDelete);

module.exports = router;