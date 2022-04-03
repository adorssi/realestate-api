const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

router.get('/', currencyController.listAll);
router.get('/:id', currencyController.getOne);

router.post('/add', currencyController.add);

router.patch('/:id', currencyController.update);

router.delete('/:id', currencyController.hardDelete);

module.exports = router;