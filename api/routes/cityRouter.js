const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.listAll);
//router.get('/withProperties', cityController.listOnlyWithProperties);
router.get('/:id', cityController.getOne);

router.post('/add', cityController.add);

router.patch('/:id', cityController.update);

router.delete('/:id', cityController.hardDelete);

module.exports = router;